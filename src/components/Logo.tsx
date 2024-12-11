import React, { useEffect } from "react";

import Image from "next/image";
import gsap from "gsap";

function Logo({ isLoaderFinished }: { isLoaderFinished: boolean }) {
  // useEffect(() => {
  //   if (isLoaderFinished) {
  //     gsap.fromTo(
  //       ".headerLogo",
  //       { opacity: 0, x: -50 },
  //       { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  //     );

  //     gsap.fromTo(
  //       ".headerName",
  //       { opacity: 0, x: -50 },
  //       { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
  //     );
  //   }
  // }, [isLoaderFinished]);

  return (
    <div className="logoHeader flex w-fit items-end gap-1">
      <Image
        className="headerLogo h-8 w-fit"
        alt="logo"
        width={500}
        height={500}
        src="m.svg"
      />
      <span className="headerName scale-90 font-semibold">Milena Buckel</span>
    </div>
  );
}

export default Logo;
