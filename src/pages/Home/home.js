import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cardlist from "../../components/Cardlist/Cardlist";
import CardPagination from "../../components/CardPagination/CardPagination";
import { ToastContainer } from "react-toastify";

import "./Home.scss";

const Home = () => {
  const [filterbtn, filterbtnClick] = useState(false);
  return (
    <div className="homepage">
      <Header />
      <ToastContainer />
      <div className="home-container">
        <div className="mb-4 me-2 text-end search-btn">
          <Button onClick={() => filterbtnClick(!filterbtn)}>
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
          <Filters />
        </div>

        <Cardlist />
        <CardPagination />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
