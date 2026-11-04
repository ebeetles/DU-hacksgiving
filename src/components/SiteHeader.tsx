import Link from "next/link";
import { WordmarkInline } from "./Wordmark";

export function SiteHeader() {
  return (
    <header className="topbar">
      <div className="topbar__inner">
        <Link className="topbar__brand" href="/" aria-label="Hacksgiving home">
          <WordmarkInline />
        </Link>
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
