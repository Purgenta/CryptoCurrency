import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
import style from "./Layout.module.css";
import Footer from "./Footer";
const header = document.querySelector("#main-header")!;
const footer = document.querySelector("#main-footer")!;
const Layout = () => {
  return (
    <>
      {createPortal(<Navigation />, header)}
      <div className={style["content-container"]}>{<Outlet />}</div>
      {createPortal(<Footer />, footer)}
    </>
  );
};

export default Layout;
