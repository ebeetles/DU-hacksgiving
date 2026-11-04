import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section board">
      <div className="wrap">
        <h1 className="section__title">404: page not found</h1>
        <p className="section__lede">That page isn&apos;t on the menu.</p>
        <Link className="button" href="/">
          Go to the home page
        </Link>
      </div>
    </section>
  );
}
