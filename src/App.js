// Components
import Header from "./components/Header";
import Home from "./components/Home";

// style
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <div className="App container">
      <Header />
      <Home />
    </div>
  );
}

export default App;
