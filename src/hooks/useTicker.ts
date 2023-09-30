import { useState, useEffect } from "react";
import { TradingPairInformation } from "../components/TradingPairs/TradingPairTable";
type ChannelInfo = { channelId: number; pair: string };
const useTicker = (tradingPairs: string[]) => {
  const [socket, setSocket] = useState<WebSocket | undefined>(undefined);
  const [tradingPairInformation, setTradingPairInformation] = useState<
    Omit<TradingPairInformation, "name">[]
  >([]);
  const [channels, setChannels] = useState<ChannelInfo[]>([]);
  const updateTradingPair = (information: Array<number | number[]>) => {
    const data = information[1] as number[];
    const channelId = +information[0] as number;
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
    setTradingPairInformation((prev) => {
      const filter = prev.filter(
        (tradingPair) => tradingPair.channelId !== channelId
      );
      return [
        {
          ask,
          bid,
          bidSize,
          askSize,
          dailyChange,
          dailyChangeRelative,
          lastPrice,
          high,
          channelId,
          low,
          volume,
        },
        ...filter,
      ];
    });
  };
  useEffect(() => {
    if (tradingPairs.length !== 0 && !socket) {
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
      wss.onopen = () => {
        tradingPairs.forEach((tradingPair) => {
          wss.send(
            JSON.stringify({
              event: "subscribe",
              channel: "ticker",
              symbol: `t${tradingPair.toUpperCase()}`,
            })
          );
        });
      };
      setSocket(wss);
    }
  }, [socket, tradingPairs]);
  return { tradingPairInformation, channels };
};
export default useTicker;
