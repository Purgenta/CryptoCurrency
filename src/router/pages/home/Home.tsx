import { useGetCurrenciesQuery } from "../../../redux/api/apiSlice";
import style from "./Home.module.css";
import TradingPairTable from "../../../components/TradingPairs/TradingPairTable";
import useTicker from "../../../hooks/useTicker";
import { motion } from "framer-motion";
import { ClipLoader } from "react-spinners";
const Home = () => {
  const { data, isError } = useGetCurrenciesQuery(undefined);
  const { channels, tradingPairInformation } = useTicker(
    data ? data.slice(0, 5) : []
  );
  const channelMap = new Map<number, string>();
  for (const { channelId, pair } of channels) {
    channelMap.set(channelId, pair);
  }
  const information = tradingPairInformation
    .filter((info) => channelMap.has(info.channelId))
    .map((info) => ({
      ...info,
      name: channelMap.get(info.channelId)!,
    }));
  return (
    <div>
      <section>
        <div className={style["msg-container__left"]}>
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0, transition: { ease: "easeOut" } }}
            exit={{ x: "-100%" }}
            className={style["message-wrapper__left"]}
          >
            <h2 className={`${style["home-welcome"]} ${style["typewriter"]}`}>
              Welcome to <span className={style["company-name"]}>Cryptex</span>{" "}
              your #1 choice for tracking trading information
            </h2>
          </motion.div>
        </div>
        <div className={style["msg-container__right"]}>
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: { ease: "easeOut", delay: 0.2 } }}
            exit={{ x: "100%" }}
            className={style["message-wrapper__right"]}
          >
            <h2 className={style["home-welcome"]}>
              Track your favourite currencies.Watch the changes happen in real
              time
            </h2>
          </motion.div>
        </div>
      </section>
      <div className={style["currency-container"]}>
        {isError ? <h3>Something went wrong</h3> : <></>}
        {information.length ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={"table-wrapper"}
          >
            <TradingPairTable information={information}></TradingPairTable>
          </motion.div>
        ) : (
          <ClipLoader
            loading={true}
            size={100}
            color="white"
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        )}
      </div>
    </div>
  );
};

export default Home;
