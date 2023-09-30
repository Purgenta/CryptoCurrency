import { useGetCurrenciesQuery } from "../../../redux/api/apiSlice";
import { useEffect, useMemo } from "react";
import style from "./Home.module.css";
import TradingPairTable from "../../../components/TradingPairs/TradingPairTable";
import useTicker from "../../../hooks/useTicker";
const Home = () => {
  const { data } = useGetCurrenciesQuery(undefined);
  const { channels, tradingPairInformation } = useTicker(
    data ? data.slice(0, 5) : []
  );
  const channelMap = new Map<number, string>();
  for (const { channelId, pair } of channels) {
    channelMap.set(channelId, pair);
  }
  return (
    <div className={style["currency-container"]}>
      <div className={style["table-wrapper"]}>
        <TradingPairTable
          information={tradingPairInformation
            .filter((info) => channelMap.has(info.channelId))
            .map((info) => ({
              ...info,
              name: channelMap.get(info.channelId)!,
            }))}
        ></TradingPairTable>
      </div>
    </div>
  );
};

export default Home;
