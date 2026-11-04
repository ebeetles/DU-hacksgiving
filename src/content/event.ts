/**
 * Every fact on the site lives here. Change a value and every page updates.
 * `null` means "not decided yet": the site shows a "coming soon" message and
 * lists the item under "What's still being finalized?" in the FAQ.
 */
export const event = {
  name: "Hacksgiving",
  host: "Delta Upsilon",
  motto: "Dikaia Upotheke | Justice Our Foundation",
  tagline: "An 8-hour hackathon for the Greater Pittsburgh Community Food Bank.",

  dateLong: "Saturday, November 21",
  timeLong: "12 to 8 pm",

  location: null as string | null,
  fundraisingDeadline: null as string | null,
  prizes: null as string | null,
  dinnerFee: "about $5" as string | null,
  /** Largest team allowed. The proposal's $20 minimum implies four. */
  teamSize: null as number | null,

  donationsOpen: "November 9",

  fundraising: {
    minimumPerPerson: 5,
    /** Used for the "$20 minimum" and meal examples. */
    exampleTeamSize: 4,
    /**
     * The food bank's own figure: "Just $1 can provide up to 3 healthy meals."
     * https://pittsburghfoodbank.org/ways-to-give/fundraise/
     */
    mealsPerDollar: 3,
    beneficiary: "Greater Pittsburgh Community Food Bank",
    beneficiaryUrl: "https://pittsburghfoodbank.org/",
  },
} as const;

/** The form's respondent link. Set NEXT_PUBLIC_SIGNUP_FORM_URL to override it. */
export const signupFormUrl: string | null =
  process.env.NEXT_PUBLIC_SIGNUP_FORM_URL?.trim() ||
  "https://docs.google.com/forms/d/e/1FAIpQLScLshZHrXF6aw0NmwxvnPXDg1Iun7bnXhpUQINDg09VLQ3k6w/viewform";

export const exampleTeamMinimum =
  event.fundraising.minimumPerPerson * event.fundraising.exampleTeamSize;
export const exampleTeamMeals = exampleTeamMinimum * event.fundraising.mealsPerDollar;

export const categories = [
  {
    id: "technical",
    name: "Best Technical",
    summary: "The most impressive engineering in the room.",
    detail: "Bring your hardest idea and show how it works.",
    decidedBy: "Delta Upsilon brothers judge each team's work.",
  },
  {
    id: "fundraised",
    name: "Most Fundraised",
    summary: "The team that raises the most for the food bank.",
    detail: "Donations, referrals and tabling all count toward your total.",
    decidedBy: "The leaderboard decides.",
  },
  {
    id: "elderly",
    name: "Best UI for Elderly",
    summary: "An interface older adults actually enjoy using.",
    detail: "Build it, then watch real people try it.",
    decidedBy: "A group of elderly guests tests the entries and has full control over who wins.",
  },
] as const;

export const faqs: { question: string; answer: string }[] = [
  {
    question: "Who can join?",
    answer: "All students are welcome.",
  },
  {
    question: "Do I need a team?",
    answer:
      "No. If you don't have one, choose to be matched with a group on the signup form.",
  },
  {
    question: "Do I need to be a strong programmer?",
    answer:
      "No. Best Technical rewards engineering, but the other categories reward creativity, design and fundraising.",
  },
  {
    question: "How big can a team be?",
    answer: event.teamSize
      ? `Up to ${event.teamSize} people.`
      : `We're confirming the team limit. The $${exampleTeamMinimum} team minimum is based on a team of ${event.fundraising.exampleTeamSize}.`,
  },
  {
    question: "Can I bring a project I've already started?",
    answer: "We may allow personal projects in Best Technical. We'll confirm this before the event.",
  },
  {
    question: "Where does the money go?",
    answer: `All donations go to the ${event.fundraising.beneficiary}.`,
  },
  {
    question: "Is dinner included?",
    answer: event.dinnerFee
      ? `We're planning to cater Thanksgiving food. You can opt in on the signup form. Expect a fee of ${event.dinnerFee}.`
      : "We're planning to cater Thanksgiving food. You can opt in on the signup form for a small fee.",
  },
  {
    question: "Who's running this?",
    answer:
      "The brothers of Delta Upsilon, a non-hazing, non-secret fraternity where everyone can belong.",
  },
];

/** Undecided details, generated from the null values above. */
export const stillDeciding = [
  !event.location && "the location",
  !event.fundraisingDeadline && "the fundraising deadline",
  !event.teamSize && "the team size limit",
  !event.prizes && "the prizes",
  !event.dinnerFee && "the dinner fee",
].filter(Boolean) as string[];
