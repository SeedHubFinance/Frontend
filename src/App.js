import Home from "./pages/Home/home";
import { Web3Provider } from "./context/web3Context";

function App() {
  return (
    <Web3Provider>
      <div className="App">
        <Home />
      </div>
    </Web3Provider>
  );
}

export default App;
