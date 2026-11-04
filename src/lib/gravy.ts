/**
 * John Upsilon's gravy-covered laptop. Plain DOM code, so the React component
 * and the single-file preview both run the same thing.
 */
const CELL = 6;
const GRAVY = ["#7a4520", "#5b2f17", "#94592a", "#6a3819"];
const MISSES = [
  "Missed. Your hand slid right off the trackpad.",
  "Missed again. That was gravy, not a double-click.",
  "So close. The trackpad has stopped taking you seriously.",
];
const BUTTON_SPOTS = [
  { x: "72%", y: "74%" },
  { x: "8%", y: "58%" },
  { x: "58%", y: "24%" },
  { x: "30%", y: "76%" },
];
const HAND = [
  "....XX........",
  "...XggX.......",
  "...XggX.......",
  "...XggXXX.....",
  "...XggXggXXX..",
  ".XXXggXggXggX.",
  "XggXggggggggX.",
  "XoggoggggoggX.",
  ".XoooooooooX..",
  "..XoooooooX...",
  "...XoooooX....",
  "....XXXXX.....",
  ".....g...g....",
  ".....g........",
];

function handCursor(): string {
  const colors: Record<string, string> = { X: "#0e1c35", o: "#f1dfbf", g: "#7a4520" };
  const rects = HAND.flatMap((row, y) =>
    [...row].flatMap((cell, x) =>
      colors[cell]
        ? [`<rect x="${x * 2}" y="${y * 2}" width="2" height="2" fill="${colors[cell]}"/>`]
        : [],
    ),
  ).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="28" height="28">${rects}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}") 9 1, pointer`;
}

export function mountGravy(root: HTMLElement): () => void {
  const screen = root.querySelector<HTMLElement>("[data-gravy-screen]");
  const canvas = root.querySelector<HTMLCanvasElement>("[data-gravy-canvas]");
  const button = root.querySelector<HTMLButtonElement>("[data-gravy-submit]");
  const status = root.querySelector<HTMLElement>("[data-gravy-status]");
  const reset = root.querySelector<HTMLButtonElement>("[data-gravy-reset]");
  const context = canvas?.getContext("2d");
  if (!screen || !canvas || !button || !status || !reset || !context) return () => {};

  const stillMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const startText = status.textContent ?? "";
  const startLabel = button.textContent ?? "";
  let attempts = 0;
  let drips: { x: number; y: number; left: number }[] = [];
  let frame = 0;
  let lastStep = 0;

  const size = () => {
    const ratio = window.devicePixelRatio || 1;
    const box = screen.getBoundingClientRect();
    canvas.width = Math.round(box.width * ratio);
    canvas.height = Math.round(box.height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
  };

  const paint = (column: number, row: number) => {
    context.fillStyle = GRAVY[Math.floor(Math.random() * GRAVY.length)];
    context.fillRect(column * CELL, row * CELL, CELL, CELL);
  };

  const runDrips = (time: number) => {
    frame = 0;
    if (!drips.length) return;
    if (time - lastStep > 70) {
      lastStep = time;
      drips = drips.filter((drip) => {
        drip.y += 1;
        drip.left -= 1;
        paint(drip.x, drip.y);
        return drip.left > 0;
      });
    }
    frame = requestAnimationFrame(runDrips);
  };

  const smear = (event: PointerEvent) => {
    const box = screen.getBoundingClientRect();
    const column = Math.floor((event.clientX - box.left) / CELL);
    const row = Math.floor((event.clientY - box.top) / CELL);
    for (let dx = -2; dx <= 2; dx += 1) {
      for (let dy = -2; dy <= 2; dy += 1) {
        if (Math.abs(dx) + Math.abs(dy) <= 3 && Math.random() < 0.72) paint(column + dx, row + dy);
      }
    }
    if (!stillMotion && Math.random() < 0.14 && drips.length < 24) {
      drips.push({ x: column, y: row + 1, left: 4 + Math.floor(Math.random() * 12) });
      if (!frame) frame = requestAnimationFrame(runDrips);
    }
  };

  const placeButton = (index: number) => {
    const spot = BUTTON_SPOTS[index];
    button.style.setProperty("--x", spot.x);
    button.style.setProperty("--y", spot.y);
  };

  const onSubmit = () => {
    if (attempts < MISSES.length) {
      status.textContent = MISSES[attempts];
      attempts += 1;
      placeButton(attempts);
      return;
    }
    button.disabled = true;
    button.textContent = "Turned in";
    status.textContent = "Turned in at 11:59 PM. John can eat. Now build him a better way.";
    reset.hidden = false;
  };

  const onReset = () => {
    attempts = 0;
    drips = [];
    placeButton(0);
    button.disabled = false;
    button.textContent = startLabel;
    status.textContent = startText;
    reset.hidden = true;
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  size();
  placeButton(0);
  screen.style.cursor = handCursor();
  button.style.cursor = "inherit";
  const observer = new ResizeObserver(size);
  observer.observe(screen);
  screen.addEventListener("pointermove", smear);
  screen.addEventListener("pointerdown", smear);
  button.addEventListener("click", onSubmit);
  reset.addEventListener("click", onReset);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    screen.removeEventListener("pointermove", smear);
    screen.removeEventListener("pointerdown", smear);
    button.removeEventListener("click", onSubmit);
    reset.removeEventListener("click", onReset);
  };
}
