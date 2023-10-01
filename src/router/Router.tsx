import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../misc/ProtectedRoute";
import NotAuthenticated from "./pages/notauthenicated/NotAuthenticated";
import Home from "./pages/home/Home";
import NotFound from "./pages/notfound/NotFound";
import Loader from "../components/Suspense/Loader";
const Router = () => {
  const Details = lazy(() => import("../router/pages/details/Details"));
  const Favourites = lazy(
    () => import("../router/pages/favourites/Favourites")
  );
  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        <Route element={<Layout />}>
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
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default Router;
