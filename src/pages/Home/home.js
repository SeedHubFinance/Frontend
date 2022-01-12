import React, { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cardlist from "../../components/Cardlist/Cardlist";
import CardPagination from "../../components/CardPagination/CardPagination";
import { ToastContainer } from "react-toastify";
import { Web3Context } from "../../context/web3Context";

import "./Home.scss";

const Home = () => {
  const [filterbtn, filterbtnClick] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    address: "",
    id: -1,
    tokenSymbol: "",
    status: "",
    pooltype: "",
    view: true,
  });

  const [web3, setWeb3] = useContext(Web3Context);

  const checkWalletConnection = async () => {
    if (!web3) {
      alert("Please Connect Wallet To View Pools");
    }
  };

  useEffect(() => {
    checkWalletConnection();
  }, [web3]);

  return (
    <div className="homepage">
      <Header />
      <ToastContainer />
      <div className="home-container">
        <div className="mb-4 me-2 text-end search-btn">
          <Link to="/fixed-swap" className="me-2">
            <Button className="ca">Create auction</Button>
          </Link>
          <Button className="filbtn" onClick={() => filterbtnClick(!filterbtn)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-search"
              viewBox="0 0 16 16"
            >
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
            </svg>
          </Button>
        </div>
        <div className={`filters ${filterbtn ? "show" : null}`}>
          <Filters filter={filters} setFilters={setFilters} />
        </div>

        <Cardlist filter={filters} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
