import Image from "next/image";
import Link from "next/link";
import React from "react";
// import gsap from "gsap";

function Logo() {
  // gsap.fromTo(
  //   ".headerLogo",
  //   { opacity: 0, x: -50 },
  //   { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" },
  // );

  // gsap.fromTo(
  //   ".headerName",
  //   { opacity: 0, x: -50 },
  //   { opacity: 1, x: 0, duration: 0.8, ease: "power2.out", delay: 0.2 },
  // );

  return (
    <Link href="/" className="logoHeader flex w-fit items-end gap-2">
      <Image
        className="headerLogo h-8 w-fit"
        alt="logo"
        width={500}
        height={500}
        src="../milena.svg"
        priority
      />
      <span className="headerName font-semibold leading-3">Milena Buckel</span>
    </Link>
  );
}

export default Logo;
