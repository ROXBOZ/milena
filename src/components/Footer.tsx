import React from "react";

function Footer({ userProfile }: { userProfile: User }) {
  return (
    <footer className="screen-margin bg-slate-100">{userProfile.name}</footer>
  );
}

export default Footer;
