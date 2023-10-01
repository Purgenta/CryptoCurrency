import { NavLink } from "react-router-dom";
import "../Tables/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { faArrowDown } from "@fortawesome/free-solid-svg-icons/faArrowDown";
import style from "./TradingPairTable.module.css";
export type TradingPairInformation = {
  name: string;
  channelId: number;
  bid: number;
  bidSize: number;
  ask: number;
  askSize: number;
  dailyChange: number;
  dailyChangeRelative: number;
  lastPrice: number;
  volume: number;
  high: number;
  low: number;
};
type Props = {
  information: TradingPairInformation[];
};
const TradingPairTable = ({ information }: Props) => {
  if (information.length === 0) return <></>;
  return (
    <table className={"crypto-table"}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last</th>
          <th>Change</th>
          <th>Change percentage</th>
          <th>High</th>
          <th>Low</th>
        </tr>
      </thead>
      <tbody>
        {information.map((info) => {
          return (
            <tr key={info.channelId}>
              <td>
                <NavLink to={`/details/${info.name}`}>{info.name}</NavLink>
              </td>
              <td>{info.lastPrice.toLocaleString("en-US")}</td>
              <td>
                <span className={style["change-direction"]}>
                  {info.dailyChange > 0 ? (
                    <FontAwesomeIcon icon={faArrowUp} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} />
                  )}
                </span>
                {Math.abs(info.dailyChange).toFixed(2)}
              </td>
              <td>
                <span className={style["change-direction"]}>
                  {info.dailyChangeRelative > 0 ? (
                    <FontAwesomeIcon icon={faArrowUp} />
                  ) : (
                    <FontAwesomeIcon icon={faArrowDown} />
                  )}
                </span>
                {Math.abs(info.dailyChangeRelative).toFixed(2)}%
              </td>
              <td>{info.high.toLocaleString("en-US")}</td>
              <td>{info.low.toLocaleString("en-US")}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TradingPairTable;
