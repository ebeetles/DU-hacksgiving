import type { LeaderboardRow } from "./types";

/**
 * The leaderboard page reads only from this function, so connecting the
 * database later won't touch the page. See supabase/schema.sql for the
 * `leaderboard` view this should query.
 */
export async function getLeaderboard(): Promise<LeaderboardRow[]> {
  return [];
}

export function totalCents(row: LeaderboardRow): number {
  return row.donatedCents + row.creditCents;
}

export function rankRows(rows: LeaderboardRow[]): LeaderboardRow[] {
  return [...rows].sort((a, b) => totalCents(b) - totalCents(a));
}

export function formatDollars(cents: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
