import { useGetCurrenciesQuery } from "../../../redux/api/apiSlice";
import style from "./Home.module.css";
import { useState, useEffect } from "react";
import TradingPairTable, {
  TradingPairInformation,
} from "../../../components/TradingPairs/TradingPairTable";
type ChannelInfo = { channelId: number; pair: string };
const Home = () => {
  const { data } = useGetCurrenciesQuery(undefined);
  const [socket, setSocket] = useState<undefined | WebSocket>(undefined);
  const [tradingPairs, setTradingPairs] = useState<string[]>([]);
  const [tradingPairInformation, setTradingPairInformation] = useState<
    Omit<TradingPairInformation, "name">[]
  >([]);
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const updateTradingPair = (information: Array<number | number[]>) => {
    const data = information[1] as number[];
    const channelId = +information[0] as number;
    setTradingPairInformation((prev) => {
      const [
        bid,
        bidSize,
        ask,
        askSize,
        dailyChange,
        dailyChangeRelative,
        lastPrice,
        volume,
        high,
        low,
      ] = data;
      if (tradingPairs.length === 5) {
        const updatedPair = prev.find(
          (pair) => pair.channelId === information[0]
        )!;
        prev = prev.filter((pair) => pair !== updatedPair);
        prev.push({
          ...updatedPair,
          channelId,
          bid,
          bidSize,
          ask,
          askSize,
          dailyChange,
          dailyChangeRelative,
          lastPrice,
          volume,
          high,
          low,
        });
      } else
        prev.push({
          channelId: channelId,
          bid,
          bidSize,
          ask,
          askSize,
          dailyChange,
          dailyChangeRelative,
          lastPrice,
          volume,
          high,
          low,
        });
      return [...prev];
    });
  };
  useEffect(() => {
    if (data && !tradingPairs.length) setTradingPairs(data.slice(0, 5));
  }, [data, tradingPairs]);
  useEffect(() => {
    if (tradingPairs.length && !socket) {
      const wss = new WebSocket("wss://api-pub.bitfinex.com/ws/2");
      wss.onmessage = (msg) => {
        const information = JSON.parse(msg.data);
        if (information?.event === "subscribed") {
          const { chanId, pair } = information as {
            chanId: number;
            pair: string;
          };
          setChannels((prev) => [...prev, { channelId: chanId, pair }]);
        }
        if (Array.isArray(information) && information[1] !== "hb")
          updateTradingPair(information);
      };
      wss.onopen = () =>
        tradingPairs.forEach((tradingPair) => {
          wss.send(
            JSON.stringify({
              event: "subscribe",
              channel: "ticker",
              symbol: `t${tradingPair.toUpperCase()}`,
            })
          );
        });
      setSocket(wss);
    }
    return () => socket?.close();
  }, [socket, tradingPairs]);
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
