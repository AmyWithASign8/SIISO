import React, { FC, ReactNode } from "react";
import Header from "./HeaderAuth";
import HeaderAuth from "./HeaderAuth";

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
