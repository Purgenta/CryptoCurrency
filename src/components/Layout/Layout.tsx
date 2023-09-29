import { createPortal } from "react-dom";
import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";
const header = document.querySelector("#main-header")!;
const Layout = () => {
  return (
    <>
      {createPortal(<Navigation />, header)}
      {<Outlet />}
    </>
  );
};

export default Layout;
