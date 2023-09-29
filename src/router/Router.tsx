import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
import ProtectedRoute from "../misc/ProtectedRoute";
import NotAuthenticated from "./pages/notauthenicated/NotAuthenticated";
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<></>}></Route>
        <Route path="/home" element={<></>}></Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/favourites" element={<></>}></Route>
        </Route>
        <Route path="/details" element={<></>}></Route>
        <Route path="/notauthenticated" element={<NotAuthenticated />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
