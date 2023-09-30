import React from "react";
import { useParams } from "react-router-dom";
const Details = () => {
  const { symbol } = useParams();
  console.log(symbol);
  return <div>Details</div>;
};

export default Details;
