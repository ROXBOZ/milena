import React, { useEffect, useState } from "react";

import { ButtonLink } from "./UI/ButtonLink";
import gsap from "gsap";

function InfoBanner({ infoBannerData }: { infoBannerData: InfoBanner }) {
  const [showBanner, setShowBanner] = useState(true);
  const lang = "fr";

  const isInternalLink = infoBannerData.link?.url.includes("milena");

  // useEffect(() => {
  //   gsap.from(".banner", {
  //     scaleX: 0,
  //     transformOrigin: "0% 50%",
  //     duration: 0.4,
  //     delay: 1,
  //   });
  // });

  return (
    showBanner &&
    infoBannerData.text && (
      <div className="banner screen-margin flex flex-wrap items-baseline justify-between gap-3 bg-gradient-to-b from-cyan-900 to-cyan-700 py-2 text-slate-50">
        <div>{infoBannerData.text[lang]}</div>{" "}
        <div className="flex items-baseline gap-12">
          {infoBannerData.link && (
            <ButtonLink
              href={infoBannerData.link.url}
              color="dark"
              isInternalLink={isInternalLink}
            >
              {infoBannerData.link.label[lang].toLowerCase()}
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
