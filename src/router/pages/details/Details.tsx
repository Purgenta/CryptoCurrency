import { useParams } from "react-router-dom";
import { useGetCurrencyDetailsQuery } from "../../../redux/api/detailsSlice";
import style from "./Details.module.css";
import { toast } from "react-toastify";
import "../../../components/Tables/Table.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  favouriteSelector,
  removeFavourite,
} from "../../../redux/favouriteSlice/favouriteSlice";
import { StoreDispatch } from "../../../redux/store";
import { authenticationSelector } from "../../../redux/authSlice/authSlice";
const Details = () => {
  const { symbol } = useParams();
  const { data, isError } = useGetCurrencyDetailsQuery(symbol + "");
  const { isAuthenticated } = useSelector(authenticationSelector);
  const isFavourite = useSelector(favouriteSelector).items.find(
    (item) => item === symbol
  );
  const dispatch = useDispatch<StoreDispatch>();
  const addToFavourites = () => {
    dispatch(addFavourite(symbol + ""));
  };
  const removeFromFavourites = () => {
    dispatch(removeFavourite(symbol + ""));
  };
  return (
    <div className={style["container"]}>
      {isError ? <h3>Something went wrong</h3> : <></>}
      {!isError && data ? (
        <div className={"table-wrapper"}>
          <table className={"crypto-table"}>
            <thead>
              <tr>
                <th>Symbol</th>
                <th>Last price</th>
                <th>High</th>
                <th>Low</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{symbol}</td>
                <td>{data?.last_price}</td>
                <td>{data?.high}</td>
                <td>{data?.low}</td>
              </tr>
            </tbody>
            <tfoot></tfoot>
          </table>
        </div>
      ) : (
        <></>
      )}
      {!isError && data && isAuthenticated ? (
        <div className={style["favourite-control"]}>
          {isFavourite ? (
            <button
              className={style["remove-btn"]}
              onClick={() => {
                removeFromFavourites();
                toast.info(`Removed ${symbol} from favourites`);
              }}
            >
              Remove from favourites
            </button>
          ) : (
            <button
              className={style["add-btn"]}
              onClick={() => {
                addToFavourites();
                toast.success(`Added ${symbol} to favourites`);
              }}
            >
              Add to favourites
            </button>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Details;
