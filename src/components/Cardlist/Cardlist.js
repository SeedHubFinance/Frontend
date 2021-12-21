import React from "react";
import TokenSaleCard from "../TokenSaleCard/TokenSaleCard";
import "./Cardlist.scss";

const Cardlist = (props) => {
  return (
    <div className="cardlist">
      <TokenSaleCard />
      <TokenSaleCard />
    </div>
  );
};
export default Cardlist;
