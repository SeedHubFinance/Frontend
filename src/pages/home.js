import Footer from "../components/footer";
import Header from "../components/header";
import Jumbotron from "../components/jumbotron";
import Card from "../components/card";
import Pagination from "../components/pagination";
const Home = () => {
  return (
    <div>
      <Header />
      <Jumbotron />
      <div class="container">
        <div class="row row-cols-1 row-cols-md-3">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
      <Pagination />
    </div>
  );
};

export default Home;
