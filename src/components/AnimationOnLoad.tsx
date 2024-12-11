import React, { useEffect } from "react";

import Image from "next/image";
import gsap from "gsap";

function AnimationOnLoad({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        onComplete(); // Notify parent when animation completes
      },
    });
    tl.to(".logo", {
      duration: 0.5,
      scale: 1,
      ease: "back.out(1.7)",
    })
      .to(
        ".logo",
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
        ".name",
        {
          duration: 0.3,
          opacity: 1,
          scale: 1.2,
          ease: "elastic.out(1, 0.3)",
        },
        "-=0.5",
      )
      .to(
        ".name",
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
          document.querySelector(".modal-container")?.remove();
        },
      });
  }, []);

  return (
    <div className="modal-container absolute left-0 top-0 flex h-screen w-screen items-center justify-center bg-white">
      <div className="logo -mt-12 flex size-36 scale-0 flex-col items-center gap-2">
        <Image alt="logo Milena Buckel" width={500} height={500} src="m.svg" />
        <span className="name scale-90 font-semibold">Milena Buckel</span>
      </div>
    </div>
  );
}

export default AnimationOnLoad;
