import Link from "next/link";
import Logo from "./Logo";
import React from "react";

function Header({ menu }: { menu: HeaderMenu[] }) {
  const lang = "fr";

  return (
    <header className="screen-margin flex items-baseline justify-between border-b border-stone-950 py-4">
      <Logo />
      <nav className="flex gap-8">
        {menu &&
          menu.map((item: HeaderMenu, index: number) => {
            return (
              <Link key={index} href={item.slug[lang].current}>
                {item.name[lang]}
              </Link>
            );
          })}
      </nav>
    </header>
  );
}

export default Header;
