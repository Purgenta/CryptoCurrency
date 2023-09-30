import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../misc/ProtectedRoute";
import NotAuthenticated from "./pages/notauthenicated/NotAuthenticated";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<></>}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/favourites" element={<></>}></Route>
        </Route>
        <Route path="/details/:symbol" element={<Details />}></Route>
        <Route path="/notauthenticated" element={<NotAuthenticated />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
