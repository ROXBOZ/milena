import Footer from "./Footer";
import Header from "./Header";
import InfoBanner from "./InfoBanner";
import React from "react";

function Layout({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: Settings;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header settings={settings} />
      <InfoBanner infoBannerData={settings.infoBanner} />
      <main className="screen-margin h-auto flex-1">
        <div className="mx-auto">{children}</div>
      </main>
      <Footer settings={settings} />
    </div>
  );
}

export default Layout;
