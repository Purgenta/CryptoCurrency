import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../misc/ProtectedRoute";
import NotAuthenticated from "./pages/notauthenicated/NotAuthenticated";
import ClipLoader from "react-spinners/ClipLoader";
import Home from "./pages/home/Home";
const Router = () => {
  const Details = lazy(() => import("../router/pages/details/Details"));
  const Favourites = lazy(
    () => import("../router/pages/favourites/Favourites")
  );
  return (
    <Suspense fallback={<ClipLoader loading={true} />}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<></>}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/favourites" element={<Favourites />}></Route>
          </Route>
          <Route path="/details/:symbol" element={<Details />}></Route>
          <Route
            path="/notauthenticated"
            element={<NotAuthenticated />}
          ></Route>
          <Route path="/" element={<Home />}></Route>
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
