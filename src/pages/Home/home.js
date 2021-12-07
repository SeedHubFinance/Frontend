import Filters from "../../components/Filters/Filters";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Cardlist from "../../components/Card/Cardlist";
import CardPagination from "../../components/CardPagination/CardPagination";
import "./Home.scss";

const Home = () => {
  return (
    <div className="homepage">
      <Header />
      <div className="home-container">
        <Filters />
        <Cardlist />
        <CardPagination />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
