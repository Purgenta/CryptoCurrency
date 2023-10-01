import { faBitcoin } from "@fortawesome/free-brands-svg-icons";
import { faCoins } from "@fortawesome/free-solid-svg-icons/faCoins";
import { motion } from "framer-motion";
import { faDollar } from "@fortawesome/free-solid-svg-icons/faDollar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Currencies.module.css";
const Currencies = () => {
  return (
    <div className={style["container"]}>
      <motion.div>
        <FontAwesomeIcon size={"2x"} icon={faBitcoin}></FontAwesomeIcon>
      </motion.div>
      <motion.div>
        <FontAwesomeIcon size={"2x"} icon={faCoins}></FontAwesomeIcon>
      </motion.div>
      <motion.div>
        <FontAwesomeIcon size={"2x"} icon={faDollar}></FontAwesomeIcon>
      </motion.div>
    </div>
  );
};

export default Currencies;
