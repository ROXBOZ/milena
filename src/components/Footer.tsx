import Link from "next/link";
import React from "react";

function Footer({ settings }: { settings: Settings }) {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="screen-margin flex flex-col gap-12 border-t border-slate-950 pb-1 pt-4">
      <div className="text-xs">
        © {settings.userName}, {currentYear}. Site web par{" "}
        <Link className="font-semibold" href="https://www.velma.studio">
          Velma Studio
        </Link>
      </div>
    </footer>
  );
}

export default Footer;
