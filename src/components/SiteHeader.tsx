import Link from "next/link";
import { event } from "@/content/event";
import { GreekLetters } from "./GreekLetters";
import { WordmarkInline } from "./Wordmark";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__brand" href="/" aria-label="Hacksgiving home">
          <WordmarkInline />
        </Link>
        <span className="topbar__by">
          by <GreekLetters className="topbar__greek" />
          <span className="sr">{event.host}</span>
        </span>
        <nav className="topbar__nav" aria-label="Main">
          <Link href="/#categories">Categories</Link>
          <Link href="/#fundraising">Fundraising</Link>
          <Link href="/leaderboard">Leaderboard</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link className="button button--small" href="/#signup">
          Sign up
        </Link>
      </div>
    </header>
  );
}
