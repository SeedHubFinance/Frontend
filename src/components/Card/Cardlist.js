import React, { useState } from "react";
import CardComponent from "./CardComponent";
import "./Cardlist.scss";

const Cardlist = (props) => {
  const [cardData, setCardData] = useState([
    {
      id: 1,
      title: "ETH/SHIB",
      address: "0xA447...C354",
      pair: "LINK /ETH",
      swapRatio: "200 : 1",
      price: 22.8378,
      participants: "public",
    },
    {
      id: 2,
      title: "ETH/SHIB",
      address: "0xA447...C354",
      pair: "LINK /ETH",
      swapRatio: "200 : 1",
      price: 22.8378,
      participants: "public",
    },
    {
      id: 3,
      title: "ETH/SHIB",
      address: "0xA447...C354",
      pair: "LINK /ETH",
      swapRatio: "200 : 1",
      price: 22.8378,
      participants: "public",
    },
  ]);

  const ListCardComponent = cardData.map((data) => (
    <CardComponent
      id={data.id}
      title={data.title}
      address={data.address}
      pair={data.pair}
      swapRatio={data.swapRatio}
      price={data.price}
      participants={data.participants}
    />
  ));
  return <div className="cardlist">{ListCardComponent}</div>;
};
export default Cardlist;
