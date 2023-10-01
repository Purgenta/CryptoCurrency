import style from "./Loader.module.css";
import { ClipLoader } from "react-spinners";
const Loader = () => {
  return (
    <div className={style["container"]}>
      <ClipLoader size={150} color="white" loading={true} />
    </div>
  );
};

export default Loader;
