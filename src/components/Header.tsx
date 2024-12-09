import Logo from "./Logo";
import React from "react";

function Header({ settings }: { settings: Settings }) {
  return (
    <header className="screen-margin z-30 bg-slate-200 py-4">
      <Logo />
    </header>
  );
}

export default Header;
