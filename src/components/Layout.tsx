import Footer from "./Footer";
import Header from "./Header";
import React from "react";

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="screen-margin h-auto flex-1">
        <div className="mx-auto">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
