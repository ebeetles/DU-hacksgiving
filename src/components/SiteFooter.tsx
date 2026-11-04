import { event } from "@/content/event";
import { WordmarkClosing } from "./Wordmark";

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <WordmarkClosing />
        <div className="footer__meta">
          <p>
            Hosted by {event.host} at Carnegie Mellon.
            <br />
            {event.motto}
          </p>
          <p>
            All donations go to the{" "}
            <a href={event.fundraising.beneficiaryUrl} target="_blank" rel="noreferrer">
              {event.fundraising.beneficiary}
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
