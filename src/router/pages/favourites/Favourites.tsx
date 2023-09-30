import { useSelector } from "react-redux";
import { favouriteSelector } from "../../../redux/favouriteSlice/favouriteSlice";
import useTicker from "../../../hooks/useTicker";
import TradingPairTable from "../../../components/TradingPairs/TradingPairTable";
const Favourites = () => {
  const { items } = useSelector(favouriteSelector);
  const { channels, tradingPairInformation } = useTicker(items);
  const channelMap = new Map<number, string>();
  for (const { channelId, pair } of channels) {
    channelMap.set(channelId, pair);
  }
  return (
    <div>
      <TradingPairTable
        information={tradingPairInformation
          .filter((info) => channelMap.has(info.channelId))
          .map((info) => ({
            ...info,
            name: channelMap.get(info.channelId)!,
          }))}
      ></TradingPairTable>
    </div>
  );
};

export default Favourites;
