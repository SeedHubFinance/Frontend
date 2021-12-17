import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home/home";
import FixedSwap from "./pages/FixedSwap/FixedSwap";
import { Web3Provider } from "./context/web3Context";
import "./App.scss";

function App() {
  return (
    <Web3Provider>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fixed-swap" element={<FixedSwap />} />
        </Routes>
      </div>
    </Web3Provider>
  );
}

export default App;
