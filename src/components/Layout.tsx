import AnimationOnLoad from "./AnimationOnLoad";
import Footer from "./Footer";
import Header from "./Header";
import InfoBanner from "./InfoBanner";
import React from "react";

function Layout({
  children,
  settings,
  isLoaderFinished,
  setIsLoaderFinished,
}: {
  children: React.ReactNode;
  settings: Settings;
  isLoaderFinished: boolean;
  setIsLoaderFinished: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <AnimationOnLoad onComplete={() => setIsLoaderFinished(true)} />
      <Header isLoaderFinished={isLoaderFinished} />
      <InfoBanner
        infoBannerData={settings.infoBanner}
        isLoaderFinished={isLoaderFinished}
      />
      <main className="flex h-auto flex-1 overflow-x-auto">
        <div className="flex flex-1">{children}</div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default Layout;
