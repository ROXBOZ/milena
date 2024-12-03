import React from "react";

function Header({ userProfile }: { userProfile: User }) {
  return (
    <header className="screen-margin bg-slate-100">{userProfile.name}</header>
  );
}

export default Header;
