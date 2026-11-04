import { signupFormUrl } from "@/content/event";
import { toEmbedUrl, toRespondentUrl } from "@/lib/forms";

export function SignupEmbed() {
  const embedUrl = signupFormUrl ? toEmbedUrl(signupFormUrl) : null;

  if (!signupFormUrl) {
    return (
      <div className="form-panel form-panel--empty">
        <p className="form-panel__title">Signup opens here soon.</p>
        <p>In the meantime, look for us tabling on the Cut.</p>
      </div>
    );
  }

  return (
    <div className="form-panel">
      {embedUrl && (
        <iframe
          className="form-panel__frame"
          src={embedUrl}
          title="Hacksgiving signup form"
          loading="lazy"
        />
      )}
      <p className="form-panel__fallback">
        <a href={toRespondentUrl(signupFormUrl)} target="_blank" rel="noreferrer">
          {embedUrl ? "Open the form in a new tab" : "Open the signup form"}
        </a>
      </p>
    </div>
  );
}
