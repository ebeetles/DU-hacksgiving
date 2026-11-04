# Hacksgiving

The website for Delta Upsilon's Hacksgiving hackathon: Saturday, November 21, 12 to 8 pm, raising money for the Greater Pittsburgh Community Food Bank.

## Run it

```bash
npm install
npm run dev
```

The site opens at http://localhost:3000.

## Common changes

| To change | Edit |
| --- | --- |
| Dates, location, prizes, team size, categories, FAQ | `src/content/event.ts` |
| Signup form | `signupFormUrl` in `src/content/event.ts` |
| Page text and layout | `src/app/page.tsx` |
| Colors, fonts and spacing | `src/app/globals.css` |

In `event.ts`, `null` means undecided. The site shows "coming soon" and lists the item in the FAQ until you fill it in.

Use the full `docs.google.com/forms/.../viewform` link for the signup form, because shortened `forms.gle` links can't be embedded.

## Poster QR code

Point the QR code at `https://<your-domain>/signup`. It redirects to the signup section, so the page can change without reprinting posters.

## Deploy

Import this repo into Vercel, set `NEXT_PUBLIC_SITE_URL` to the site's address, and deploy. Every push to `main` then updates the site.

## What's next

| Stage | Adds | Where it goes |
| --- | --- | --- |
| Fundraising | Donation logging, a review queue and the live leaderboard | `src/lib/data/leaderboard.ts`, `supabase/schema.sql` |
| Organizers | Team roster, rooms, dinner, merch and budget behind a login | `src/app/organizers/` |
| Event day | Schedule, project submissions and judging | `src/app/event/` |

The leaderboard page already reads from `getLeaderboard()`, which returns no teams for now. Connecting it to the `leaderboard` view in `supabase/schema.sql` won't require changing the page. The schema is a draft and isn't connected yet.

## Preview file

`npm run build`, `npm start`, then `npm run preview:single` writes `preview-dist/index.html`, one self-contained file of the site. It doesn't embed the Google Form.
