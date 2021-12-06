<<<<<<< HEAD
import Home from "./pages/Home/home";
import { Web3Provider } from "./context/web3Context";
import "./App.scss";

function App() {
  return (
    <Web3Provider>
      <div className="app">
        <Home />
      </div>
    </Web3Provider>
=======
import Home from "./pages/home";
import TestPage from "./pages/testPool"
import FixedPriceSalePage from "./pages/testFixedPriceSwap"

function App() {
  return (
    <div className="App">
      <FixedPriceSalePage />
    </div>
>>>>>>> contracts-demo
  );
}

export default App;
