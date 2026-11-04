const GOOGLE_FORMS_PATH = /^\/forms(?:\/u\/\d+)?\/d\/(e\/)?([\w-]+)/;

/**
 * Turns any Google Form link into the page respondents see. An editor link
 * (.../edit) is converted so it never appears on the public site.
 */
export function toRespondentUrl(url: string): string {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(GOOGLE_FORMS_PATH);
    if (parsed.hostname !== "docs.google.com" || !match) return url;
    return `https://docs.google.com/forms/d/${match[1] ?? ""}${match[2]}/viewform`;
  } catch {
    return url;
  }
}

/** The embeddable address of a Google Form, or null if the link can't be embedded. */
export function toEmbedUrl(url: string): string | null {
  const respondentUrl = toRespondentUrl(url);
  if (!respondentUrl.endsWith("/viewform")) return null;
  return `${respondentUrl}?embedded=true`;
}
