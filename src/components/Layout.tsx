import AnimationOnLoad from "./AnimationOnLoad";
import Footer from "./Footer";
import Header from "./Header";
import InfoBanner from "./InfoBanner";
import React from "react";
import { useRouter } from "next/router";

function Layout({
  children,
  settings,
  isLoaderFinished,
  setIsLoaderFinished,
  menus,
}: {
  children: React.ReactNode;
  settings: Settings;
  isLoaderFinished: boolean;
  setIsLoaderFinished: React.Dispatch<React.SetStateAction<boolean>>;
  menus: Menus[];
}) {
  const currentPath = useRouter().pathname;
  const isHome = currentPath === "/";

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {isHome && (
        <AnimationOnLoad onComplete={() => setIsLoaderFinished(true)} />
      )}
      {isLoaderFinished && (
        <>
          <Header
            isLoaderFinished={isLoaderFinished}
            menu={menus[0].headerMenu}
          />
          {isHome && (
            <InfoBanner
              infoBannerData={settings.infoBanner}
              isLoaderFinished={isLoaderFinished}
            />
          )}
        </>
      )}
      <main className="flex h-auto flex-1 overflow-x-auto">
        <div className="flex flex-1">{children}</div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default Layout;
