import React, { useEffect, useState } from "react";

import gsap from "gsap";

function InfoBanner({
  infoBannerData,
  isLoaderFinished,
}: {
  infoBannerData: InfoBanner;
  isLoaderFinished: boolean;
}) {
  const [showBanner, setShowBanner] = useState(true);
  const lang = "fr";

  const isInternalLink = infoBannerData.link?.url.includes("milena");

  // useEffect(() => {
  //   if (isLoaderFinished && !showBanner) {
  //     setShowBanner(true);
  //     console.log("banner animate");
  //     gsap.fromTo(
  //       ".banner",
  //       {
  //         height: 0,
  //         opacity: 0,
  //         overflow: "hidden",
  //         clipPath: "inset(0 0 100% 0)",
  //       },
  //       {
  //         height: "auto",
  //         opacity: 1,
  //         clipPath: "inset(0 0 0% 0)",
  //         duration: 0.5,
  //         ease: "power2.out",
  //       },
  //     );
  //   }
  // }, [isLoaderFinished, showBanner]);

  return (
    showBanner &&
    infoBannerData.text && (
      <div className="banner screen-margin flex flex-wrap items-baseline justify-between gap-3 bg-slate-950 bg-gradient-to-b py-2 text-slate-50">
        <div>{infoBannerData.text[lang]}</div>
        <div className="flex items-baseline gap-12">
          {infoBannerData.link && (
            <a
              href={infoBannerData.link.url}
              className="text-link"
              target={isInternalLink ? "_self" : "_blank"}
            >
              {infoBannerData.link.label[lang].toLowerCase()}
            </a>
          )}
          <button
            onClick={() => setShowBanner(false)}
            className="flex aspect-square rounded-full p-3 text-lg ring-inset transition-all delay-100 hover:bg-slate-900 hover:ring-slate-800 active:bg-slate-800"
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
