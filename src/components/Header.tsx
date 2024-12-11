import Link from "next/link";
import Logo from "./Logo";
import React from "react";

interface Menu {
  name: { fr: string; en: string };
  slug: { fr: { current: string }; en: { current: string } };
}

function Header({
  isLoaderFinished,
  menu,
}: {
  isLoaderFinished: boolean;
  menu: Menu[];
}) {
  console.log("menu icite", menu);
  const lang = "fr";

  return (
    <header className="screen-margin flex items-baseline justify-between border-b border-slate-950 py-4">
      <Logo isLoaderFinished={isLoaderFinished} />
      <nav className="flex gap-8">
        {menu &&
          menu.map((item: Menu, index: number) => (
            <Link key={index} href={item.slug[lang].current}>
              {item.name[lang]}
            </Link>
          ))}
      </nav>
    </header>
  );
}

export default Header;
