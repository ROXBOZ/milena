import Footer from "./Footer";
import Header from "./Header";
import InfoBanner from "./InfoBanner";
import React from "react";
import { useRouter } from "next/router";

function Layout({
  children,
  settings,

  menus,
}: {
  children: React.ReactNode;
  settings: Settings;

  menus: Menus[];
}) {
  const currentPath = useRouter().pathname;
  const isHome = currentPath === "/";

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* {isHome && (
        <AnimationOnLoad onComplete={() => setIsLoaderFinished(true)} />
      )} */}
      <>
        <Header menu={menus[0].headerMenu} />
        {isHome && <InfoBanner infoBannerData={settings.infoBanner} />}
      </>
      <main className="flex h-auto flex-1 overflow-x-auto">
        <div className="flex flex-1">{children}</div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default Layout;
