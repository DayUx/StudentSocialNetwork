import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
        <LogIn></LogIn>
        <Register></Register>
    </div>
  );
}

export default App;
