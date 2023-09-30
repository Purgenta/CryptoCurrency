import { NavLink } from "react-router-dom";
import style from "./Navigation.module.css";
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import {
  authenticateUser,
  authenticationSelector,
} from "../../redux/authSlice/authSlice";
import { StoreDispatch } from "../../redux/store";
type Route = {
  name: string;
  to: string;
  requiresAuth: boolean;
};
const animationVariants = {
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  hidden: {
    opacity: 0,
    transition: {
      when: "afterChildren",
    },
  },
};
const linkAnimationVariants = {
  hidden: { y: "-150%" },
  visible: { y: 0 },
};
const loginButtonVariants = {
  hidden: { x: "150%" },
  visible: {
    x: 0,
    transition: {
      ease: "easeOut",
      duration: "0.2",
    },
  },
};
const Navigation = () => {
  const routes: Set<Route> = new Set<Route>([
    { name: "Home", to: "/home", requiresAuth: false },
    { name: "Favourites", to: "/favourites", requiresAuth: true },
  ]);
  const links = [...routes];
  const { isAuthenticated } = useSelector(authenticationSelector);
  const dispatch = useDispatch<StoreDispatch>();
  return (
    <motion.nav
      variants={animationVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={style["main-nav"]}
    >
      <ul className={style["nav-links"]}>
        {links
          .filter((route) => {
            return !route.requiresAuth || isAuthenticated;
          })
          .map((route) => (
            <motion.li variants={linkAnimationVariants} key={route.to}>
              <NavLink
                to={route.to}
                className={({ isActive }) =>
                  isActive ? style["active-route"] : ""
                }
              >
                {route.name}
              </NavLink>
            </motion.li>
          ))}
      </ul>
      {!isAuthenticated ? (
        <div className={style["account-actions__container"]}>
          <motion.button
            variants={loginButtonVariants}
            className={style["login-btn"]}
            onClick={async () => await dispatch(authenticateUser())}
            type="button"
            aria-label="login"
          >
            Login
          </motion.button>
        </div>
      ) : (
        <></>
      )}
    </motion.nav>
  );
};

export default Navigation;
