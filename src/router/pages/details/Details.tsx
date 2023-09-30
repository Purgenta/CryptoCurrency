import { useParams } from "react-router-dom";
import { useGetCurrencyDetailsQuery } from "../../../redux/api/detailsSlice";
import style from "./Details.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavourite,
  favouriteSelector,
  removeFavourite,
} from "../../../redux/favouriteSlice/favouriteSlice";
import { StoreDispatch } from "../../../redux/store";
const Details = () => {
  const { symbol } = useParams();
  const { data } = useGetCurrencyDetailsQuery(symbol + "");
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
    <div className={style["table-wrapper"]}>
      <table className={style["crypto-table"]}>
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
      {isFavourite ? (
        <button onClick={() => removeFromFavourites()}>
          Remove from favourites
        </button>
      ) : (
        <button onClick={() => addToFavourites()}>Add to favourites</button>
      )}
    </div>
  );
};

export default Details;
