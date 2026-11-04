import Link from "next/link";
import {
  categories,
  event,
  exampleTeamMeals,
  exampleTeamMinimum,
  faqs,
  stillDeciding,
} from "@/content/event";
import { GravyLaptop } from "@/components/GravyLaptop";
import { LockedCategory } from "@/components/LockedCategory";
import { SignupEmbed } from "@/components/SignupEmbed";
import { Wordmark } from "@/components/Wordmark";

const { minimumPerPerson, mealsPerDollar, beneficiary } = event.fundraising;

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero__inner">
          <h1 className="wordmark">
            <span className="sr">Hacksgiving</span>
            <Wordmark />
          </h1>
          <div className="hero__body">
            <div className="hero__text">
              <p className="hero__tagline">{event.tagline}</p>
              <dl className="facts">
                <div>
                  <dt>When</dt>
                  <dd>
                    {event.dateLong}, {event.timeLong}
                  </dd>
                </div>
                <div>
                  <dt>Where</dt>
                  <dd>{event.location ?? "Location coming soon"}</dd>
                </div>
                <div>
                  <dt>Who</dt>
                  <dd>All students welcome</dd>
                </div>
                <div>
                  <dt>Entry</dt>
                  <dd>${minimumPerPerson} per person, raised for the food bank</dd>
                </div>
              </dl>
              <div className="hero__actions">
                <Link className="button" href="#signup">
                  Sign up
                </Link>
                <Link className="button button--ghost" href="#categories">
                  See the categories
                </Link>
              </div>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="hero__turkey"
              src="/turkey.png"
              width="96"
              height="80"
              alt="A turkey in sunglasses typing on a Delta Upsilon laptop"
            />
          </div>
        </div>
      </section>

      <section className="section" id="categories">
        <div className="wrap">
          <h2 className="section__title">Four ways to win</h2>
          <p className="section__lede">
            You get eight hours. Pick the prize you want and build for it.{" "}
            {event.prizes ?? "Prize details are coming soon."}
          </p>
          <div className="prizes">
            {categories.map((category) => (
              <article className="prize" key={category.id}>
                <h3 className="prize__name">{category.name}</h3>
                <div className="prize__body">
                  <p className="prize__summary">{category.summary}</p>
                  <p>{category.detail}</p>
                </div>
                <p className="prize__judge">
                  <strong>Who decides</strong>
                  {category.decidedBy}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {event.secretCategoryRevealed ? (
        <section className="john" id="john-upsilon">
          <div className="wrap john__inner">
            <div className="john__story">
              <h2 className="john__title">John Upsilon Turkey Award</h2>
              <p>
                John has an assignment due by midnight, but he still needs to eat. His hands are
                covered in delicious gravy, and he needs a way to use his computer.
              </p>
              <p>
                Come up with a creative way to help him. Brothers will rigorously test every entry
                while eating a hearty Thanksgiving meal.
              </p>
            </div>
            <GravyLaptop />
          </div>
        </section>
      ) : (
        <section className="vault" id="secret-category">
          <div className="wrap">
            <LockedCategory />
          </div>
        </section>
      )}

      <section className="fund" id="fundraising">
        <div className="wrap fund__inner">
          <div className="fund__intro">
            <h2 className="section__title">Every team feeds someone</h2>
            <p className="section__lede">
              All donations go to the {beneficiary}. Fundraising opens {event.donationsOpen}, and
              every team needs to do one of two things to qualify for prizes.
            </p>
          </div>

          <div className="paths">
            <div className="path">
              <h3>Raise ${minimumPerPerson} per person</h3>
              <p>
                A team of {event.fundraising.exampleTeamSize} raises at least ${exampleTeamMinimum}.
                Your team sends us proof of each donation.
              </p>
            </div>
            <p className="paths__or">or</p>
            <div className="path">
              <h3>Refer another team</h3>
              <p>
                Each referral counts as ${minimumPerPerson} per person on your team toward your
                total.
              </p>
            </div>
          </div>

          <figure className="meals">
            <div
              className="meals__grid"
              role="img"
              aria-label={`${exampleTeamMeals} squares, one for each meal`}
            >
              {Array.from({ length: exampleTeamMeals }, (_, index) => (
                <span key={index} />
              ))}
            </div>
            <figcaption>
              <strong>Up to {exampleTeamMeals} meals.</strong> That&apos;s what one team of{" "}
              {event.fundraising.exampleTeamSize} provides at the ${exampleTeamMinimum} minimum. The
              food bank says each $1 can provide up to {mealsPerDollar} meals.
            </figcaption>
          </figure>

          <div className="fund__columns">
            <div>
              <h3 className="fund__heading">Climb the leaderboard</h3>
              <p>
                The team with the highest total wins Most Fundraised. You can also help us advertise
                on the Cut for extra credit toward your total.
              </p>
              <p>
                <Link className="link" href="/leaderboard">
                  View the leaderboard
                </Link>
              </p>
            </div>
            <div>
              <h3 className="fund__heading">Key dates</h3>
              <ol className="dates">
                <li>
                  <span>{event.donationsOpen}</span>Donations open
                </li>
                <li>
                  <span>{event.fundraisingDeadline ?? "Date coming soon"}</span>Fundraising deadline.
                  The leaderboard closes two days earlier.
                </li>
                <li>
                  <span>November 21, 12 pm</span>Hacking starts
                </li>
                <li>
                  <span>November 21, 8 pm</span>Hacking ends
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section className="section table" id="dinner">
        <div className="wrap table__inner">
          <div>
            <h2 className="table__title">Dinner</h2>
            <p>
              We&apos;re planning to cater Thanksgiving food. Opt in on the signup form, and expect a
              fee of {event.dinnerFee ?? "a few dollars"}.
            </p>
          </div>
          <div>
            <h2 className="table__title">Merch</h2>
            <p>
              Every participant should go home with something. Expect turkey stickers in a few
              designs, and a shirt supporting the food drive.
            </p>
          </div>
        </div>
      </section>

      <section className="section signup" id="signup">
        <div className="wrap">
          <h2 className="section__title">Sign up</h2>
          <p className="section__lede">
            Have a team? List your teammates on the form. Don&apos;t have one? Ask to be matched
            with a group.
          </p>
          <SignupEmbed />
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="wrap faq__inner">
          <h2 className="section__title">Questions</h2>
          <div className="faq__list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
            {stillDeciding.length > 0 && (
              <details>
                <summary>What&apos;s still being finalized?</summary>
                <p>
                  We&apos;re still confirming {stillDeciding.slice(0, -1).join(", ")} and{" "}
                  {stillDeciding.at(-1)}. We&apos;ll post them here.
                </p>
              </details>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
