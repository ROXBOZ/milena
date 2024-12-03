import Footer from "./Footer";
import Header from "./Header";
import React from "react";

function Layout({
  children,
  userProfile,
}: {
  children: React.ReactNode;
  userProfile: User;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header userProfile={userProfile} />
      <main className="screen-margin h-auto flex-1">
        <div className="mx-auto">{children}</div>
      </main>
      <Footer userProfile={userProfile} />
    </div>
  );
}

export default Layout;
