import type { Metadata } from "next";
import Link from "next/link";
import { event } from "@/content/event";
import { formatDollars, getLeaderboard, rankRows, totalCents } from "@/lib/data/leaderboard";

export const metadata: Metadata = { title: "Leaderboard" };

export default async function LeaderboardPage() {
  const rows = rankRows(await getLeaderboard());

  return (
    <section className="section board">
      <div className="wrap">
        <h1 className="section__title">Leaderboard</h1>
        <p className="section__lede">
          Who&apos;s raised the most for the {event.fundraising.beneficiary}. The leaderboard closes
          two days before the fundraising deadline.
        </p>

        {rows.length === 0 ? (
          <div className="board__empty">
            <p className="board__empty-title">Donations open {event.donationsOpen}.</p>
            <p>Teams appear here once their first donation is verified.</p>
            <Link className="button" href="/#signup">
              Sign up
            </Link>
          </div>
        ) : (
          <div className="board__scroll">
            <table className="board__table">
              <thead>
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Donated</th>
                  <th scope="col">Credit</th>
                  <th scope="col">Total</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row, index) => (
                  <tr key={row.teamId}>
                    <td>{index + 1}</td>
                    <td>{row.teamName}</td>
                    <td>{formatDollars(row.donatedCents)}</td>
                    <td>{formatDollars(row.creditCents)}</td>
                    <td>{formatDollars(totalCents(row))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
