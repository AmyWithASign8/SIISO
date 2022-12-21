import React, { FC, ReactNode, useContext } from "react";
import Header from "./HeaderAuth";
import HeaderAuth from "./HeaderAuth";
import { check } from "../http/userAPI";
import RememberMeContext from "../Context/RememberMe";
import AuthContext from "../Context/AuthContext";

interface MainLayoutProps {
  children: ReactNode;
}
const MainLayout: FC<MainLayoutProps> = ({ children }) => {
  return (
    <div>
      <HeaderAuth />
      <main>{children}</main>
    </div>
  );
};

export default MainLayout;
