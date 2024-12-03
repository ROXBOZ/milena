import Footer from "./Footer";
import Header from "./Header";
import InfoBanner from "./InfoBanner";
import React from "react";

function Layout({
  children,
  userProfile,
  generalInfo,
}: {
  children: React.ReactNode;
  userProfile: User;
  generalInfo: GeneralInfo;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header userProfile={userProfile} />
      <InfoBanner data={generalInfo.infoBanner} />
      <main className="screen-margin h-auto flex-1">
        <div className="mx-auto">{children}</div>
      </main>
      <Footer userProfile={userProfile} />
    </div>
  );
}

export default Layout;
