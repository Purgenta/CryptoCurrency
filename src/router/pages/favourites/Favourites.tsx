import { useSelector } from "react-redux";
import { favouriteSelector } from "../../../redux/favouriteSlice/favouriteSlice";
import useTicker from "../../../hooks/useTicker";
import "../../../components/Tables/Table.css";
import style from "./Favourites.module.css";
import TradingPairTable from "../../../components/TradingPairs/TradingPairTable";
import { ClipLoader } from "react-spinners";
const Favourites = () => {
  const { items } = useSelector(favouriteSelector);
  const { channels, tradingPairInformation } = useTicker(items);
  const channelMap = new Map<number, string>();
  for (const { channelId, pair } of channels) {
    channelMap.set(channelId, pair);
  }
  <ClipLoader
    loading={true}
    size={100}
    color="white"
    aria-label="Loading Spinner"
    data-testid="loader"
  />;
  const information = tradingPairInformation
    .filter((info) => channelMap.has(info.channelId))
    .map((info) => ({
      ...info,
      name: channelMap.get(info.channelId)!,
    }));
  return (
    <div className={style["favourites-container"]}>
      {!items.length ? (
        <h3>You don't have any favourite items.</h3>
      ) : (
        <h3>Your favourite items:</h3>
      )}
      {items.length ? (
        information.length ? (
          <div className={"table-wrapper"}>
            <TradingPairTable information={information}></TradingPairTable>
          </div>
        ) : (
          <ClipLoader
            loading={true}
            size={100}
            color="white"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default Favourites;
