/** All money is stored in cents. */
export type LeaderboardRow = {
  teamId: string;
  teamName: string;
  /** Verified donations. */
  donatedCents: number;
  /** Referral and tabling credit. */
  creditCents: number;
};
