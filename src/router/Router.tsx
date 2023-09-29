import { Routes, Route } from "react-router-dom";
import Layout from "../components/Layout/Layout";
const Router = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<></>}></Route>
        <Route path="/home" element={<></>}></Route>
        <Route path="/favourites" element={<></>}></Route>
        <Route path="/details" element={<></>}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
