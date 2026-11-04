/**
 * Builds preview-dist/index.html, one self-contained file of the site for
 * sharing a look before deployment. Run `npm run build` and `npm start`, then
 * `npm run preview:single`. The Google Form can't be embedded in this version.
 */
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { build } from "esbuild";

const origin = process.env.PREVIEW_ORIGIN ?? "http://localhost:3000";
const root = path.resolve(import.meta.dirname, "..");
const fetchText = async (route) => {
  const response = await fetch(new URL(route, origin));
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  return response.text();
};
const dataUri = (buffer, type) => `data:${type};base64,${buffer.toString("base64")}`;

const homeHtml = await fetchText("/");
const boardHtml = await fetchText("/leaderboard");
const mainOf = (html) => html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
const between = (html, tag) => html.match(new RegExp(`<${tag}[\\s>][\\s\\S]*?</${tag}>`))[0];

const css = [];
for (const [, href] of homeHtml.matchAll(/<link rel="stylesheet" href="([^"]+)"/g)) {
  let sheet = await fetchText(href);
  // Inline each font's woff2 file and drop its woff fallback.
  sheet = sheet.replace(/,\s*url\([^)]+\.woff\)\s*format\("?woff"?\)/g, "");
  const urls = [...new Set([...sheet.matchAll(/url\(([^)"']+\.woff2)\)/g)].map((m) => m[1]))];
  for (const url of urls) {
    const font = await fetch(new URL(url, new URL(href, origin)));
    sheet = sheet.replaceAll(url, dataUri(Buffer.from(await font.arrayBuffer()), "font/woff2"));
  }
  css.push(sheet);
}

const turkey = dataUri(await readFile(path.join(root, "public/turkey.png")), "image/png");

const bundled = await build({
  bundle: true,
  write: false,
  minify: true,
  format: "iife",
  target: "es2020",
  stdin: {
    resolveDir: root,
    contents: `
      import { mountGravy } from "./src/lib/gravy.ts";
      document.querySelectorAll("[data-gravy-root]").forEach(mountGravy);
      const home = document.getElementById("view-home");
      const board = document.getElementById("view-leaderboard");
      const route = () => {
        const onBoard = location.hash === "#leaderboard";
        home.hidden = onBoard;
        board.hidden = !onBoard;
        if (onBoard) scrollTo(0, 0);
        else if (location.hash) document.querySelector(location.hash)?.scrollIntoView();
      };
      addEventListener("hashchange", route);
      route();
    `,
  },
});

const clean = (html) =>
  html
    // This preview can't embed other sites, so it links to the form instead.
    .replace(/<iframe[^>]*form-panel__frame[\s\S]*?(<\/iframe>|\/>)/, '<p class="form-panel__title">The signup form appears here on the live site.</p>')
    .replaceAll('src="/turkey.png"', `src="${turkey}"`)
    .replaceAll('href="/leaderboard"', 'href="#leaderboard"')
    .replaceAll('href="/#', 'href="#')
    .replaceAll('href="/"', 'href="#main"')
    .replaceAll(/<!--[\s\S]*?-->/g, "");

const output = `<title>Hacksgiving</title>
<meta name="claude:viewport-fit-sides" content="cover">
<style>${css.join("\n")}</style>
${clean(between(homeHtml, "header"))}
<main id="main">
<div id="view-home">${clean(mainOf(homeHtml))}</div>
<div id="view-leaderboard" hidden>${clean(mainOf(boardHtml))}</div>
</main>
${clean(between(homeHtml, "footer"))}
<script>${bundled.outputFiles[0].text.replaceAll("</script", "<\\/script")}</script>
`;

if (!existsSync(path.join(root, "preview-dist"))) await mkdir(path.join(root, "preview-dist"));
await writeFile(path.join(root, "preview-dist/index.html"), output);
console.log(`preview-dist/index.html: ${(output.length / 1024).toFixed(0)} KB`);
