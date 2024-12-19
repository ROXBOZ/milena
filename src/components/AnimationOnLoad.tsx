import React, { useEffect } from "react";

import Image from "next/image";
import gsap from "gsap";

function AnimationOnLoad({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const modal = document.querySelector(".modal-container");
    const logo = document.querySelector(".loaderLogo");
    const name = document.querySelector(".loaderName");

    const tl = gsap.timeline({
      onComplete: () => {
        onComplete();
      },
    });

    if (modal && logo && name) {
      tl.to(".loaderLogo", {
        duration: 0.5,
        scale: 1,
        ease: "back.out(1.7)",
      })
        .to(
          ".loaderLogo",
          {
            duration: 0.4,
            scale: 0.8,
            opacity: 0,
            delay: 1,
            ease: "power2.inOut",
          },
          "<",
        )
        .to(
          ".loaderName",
          {
            duration: 0.3,
            opacity: 1,
            scale: 1.2,
            ease: "elastic.out(1, 0.3)",
          },
          "-=0.5",
        )
        .to(
          ".loaderName",
          {
            duration: 0.3,
            scale: 1,
            opacity: 0,
            ease: "power1.inOut",
          },
          "+=0.3",
        )
        .to(".modal-container", {
          duration: 0.6,
          opacity: 0,
          y: -50,
          ease: "expo.in",
          delay: 0.5,
          onComplete: () => {
            modal.remove();
          },
        });
    }
  }, [onComplete]);

  return (
    <div className="modal-container absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-stone-50">
      <div className="loaderLogoContainer -mt-12 flex size-36 flex-col items-center gap-2">
        <Image
          className="loaderLogo scale-90"
          alt="logo"
          width={500}
          height={500}
          src="../milena.svg"
          priority
        />
        <span className="loaderName scale-90 font-semibold">Milena Buckel</span>
      </div>
    </div>
  );
}

export default AnimationOnLoad;
