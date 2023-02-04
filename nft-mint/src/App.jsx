import NoWallet from './components/NoWallet';
import Home from './components/Home';

function App() {

  if (window.ethereum) {
    return <Home />
  } else {
    return <NoWallet />
  }
}

export default App;