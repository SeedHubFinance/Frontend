import Footer from "../../components/footer";
import Header from "../../components/Header/Header";
import Filters from "../../components/Filters/Filters";
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
    </div>
  );
};

export default Home;
