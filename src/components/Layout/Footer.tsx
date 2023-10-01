import React from "react";
import style from "./Footer.module.css";
import Currencies from "../Currencies/Currencies";
const Footer = () => {
  return (
    <div>
      <Currencies />
      <h3 className={style["copyright"]}>Developed by Purgenta</h3>
    </div>
  );
};

export default Footer;
