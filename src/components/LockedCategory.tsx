"use client";

import { useState } from "react";
import { event } from "@/content/event";

const TAUNTS = [
  "Nice try.",
  "Still locked.",
  "The brothers have been notified.",
  "That's not how locks work.",
  `Come back on ${event.dateLong}.`,
];

const RATTLE = [0, -10, 9, -7, 6, -4, 3, -1, 0].map((x) => ({ translate: `${x}px 0` }));

/** A pixel padlock, drawn on a 16 by 16 grid. */
function Padlock() {
  return (
    <svg className="padlock__art" viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      <g className="padlock__shackle">
        <rect x="5" y="0" width="6" height="2" />
        <rect x="4" y="1" width="1" height="1" />
        <rect x="11" y="1" width="1" height="1" />
        <rect x="3" y="2" width="2" height="6" />
        <rect x="11" y="2" width="2" height="6" />
      </g>
      <rect className="padlock__body" x="1" y="7" width="14" height="9" />
      <rect className="padlock__shine" x="2" y="8" width="12" height="1" />
      <rect className="padlock__shade" x="1" y="15" width="14" height="1" />
      <rect className="padlock__hole" x="7" y="10" width="2" height="4" />
      <rect className="padlock__hole" x="6" y="10" width="4" height="2" />
    </svg>
  );
}

export function LockedCategory() {
  const [tries, setTries] = useState(0);

  return (
    <div className="locked">
      <div className="locked__story">
        <p className="locked__kicker">Category four</p>
        <h2 className="locked__title">
          <span className="sr">A secret category</span>
          <span className="redact" aria-hidden="true">
            <span style={{ width: "4.2ch" }} />
            <span style={{ width: "6.5ch" }} />
            <span style={{ width: "6ch" }} />
          </span>
        </h2>
        <div className="redact redact--lines" aria-hidden="true">
          <span style={{ width: "92%" }} />
          <span style={{ width: "78%" }} />
          <span style={{ width: "85%" }} />
          <span style={{ width: "40%" }} />
        </div>
        <p>
          This one is classified. We&apos;ll reveal it on {event.dateLong}, so bring your best
          ideas and an empty stomach.
        </p>
      </div>
      <div className="padlock">
        <button
          className="padlock__button"
          type="button"
          onClick={(e) => {
            setTries((n) => n + 1);
            if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
              e.currentTarget.animate(RATTLE, { duration: 500, easing: "steps(8, end)" });
            }
          }}
        >
          <span className="sr">Try to unlock the secret category</span>
          <Padlock />
        </button>
        <p className="padlock__status" aria-live="polite">
          {tries === 0 ? "Locked until the day of." : TAUNTS[(tries - 1) % TAUNTS.length]}
        </p>
      </div>
    </div>
  );
}
