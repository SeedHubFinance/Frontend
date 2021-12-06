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
  );
}

export default App;
