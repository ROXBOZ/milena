import React, { useEffect, useState } from "react";

import { ButtonLink } from "./UI/ButtonLink";
import gsap from "gsap";

function InfoBanner({ data }: { data: InfoBanner }) {
  const [showBanner, setShowBanner] = useState(true);
  const lang = "fr";

  const isInternalLink = data.link.url.includes("milena");

  useEffect(() => {
    gsap.from(".banner", { y: -100, duration: 0.5, delay: 2 });
  });

  return (
    showBanner &&
    data.text && (
      <div className="banner screen-margin flex flex-wrap items-baseline justify-between gap-3 bg-gradient-to-b from-cyan-900 to-cyan-700 py-2 text-slate-50">
        <div>{data.text[lang]}</div>{" "}
        <div className="flex items-baseline gap-12">
          {data.link && (
            <ButtonLink
              href={data.link.url}
              color="dark"
              isInternalLink={isInternalLink}
            >
              {data.link.label[lang].toLowerCase()}
            </ButtonLink>
          )}

          <button
            onClick={() => {
              setShowBanner(false);
            }}
            className="flex aspect-square rounded-full p-3 text-lg transition-all delay-100 hover:bg-slate-50/10 active:bg-slate-50/20"
          >
            <span className="leading-3">✕</span>
            <span className="sr-only">fermer</span>
          </button>
        </div>
      </div>
    )
  );
}

export default InfoBanner;
