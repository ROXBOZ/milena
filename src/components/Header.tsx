import Logo from "./Logo";
import React from "react";

function Header({ isLoaderFinished }: { isLoaderFinished: boolean }) {
  return (
    <header className="screen-margin border-b border-slate-950 py-4">
      <Logo isLoaderFinished={isLoaderFinished} />
    </header>
  );
}

export default Header;
