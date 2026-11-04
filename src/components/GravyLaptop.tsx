"use client";

import { useEffect, useRef } from "react";
import { mountGravy } from "@/lib/gravy";

export function GravyLaptop() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => (root.current ? mountGravy(root.current) : undefined), []);

  return (
    <div className="laptop" data-gravy-root ref={root}>
      <div className="laptop__lid">
        <div className="laptop__screen" data-gravy-screen>
          <div className="laptop__bar">
            <span>assignment.py</span>
            <span>11:52 PM</span>
          </div>
          <pre className="laptop__code" aria-hidden="true">
            <code>
              <span className="tok-c"># due at midnight. dinner is now.</span>
              {"\n"}
              <span className="tok-k">def</span> finish(john):{"\n"}
              {"    "}
              <span className="tok-k">if</span> john.hands.clean():{"\n"}
              {"        "}
              <span className="tok-k">return</span> john.submit(){"\n"}
              {"    "}
              <span className="tok-k">raise</span> GravyError(
              <span className="tok-s">&quot;trackpad is soup&quot;</span>)
            </code>
          </pre>
          <canvas className="laptop__gravy" data-gravy-canvas aria-hidden="true" />
          <button className="laptop__submit" type="button" data-gravy-submit>
            Turn in
          </button>
        </div>
      </div>
      <div className="laptop__base" aria-hidden="true">
        ΔΥ
      </div>
      <div className="laptop__foot">
        <p className="laptop__status" data-gravy-status aria-live="polite">
          You have gravy hands. Try to turn in John&apos;s assignment.
        </p>
        <button className="laptop__reset" type="button" data-gravy-reset hidden>
          Clean the screen
        </button>
      </div>
    </div>
  );
}
