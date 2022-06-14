import logo from './logo.svg';
import './App.css';
import Footer from "./components/Footer/Footer";
import LogIn from "./components/LogIn/LogIn";
import Register from "./components/Register/Register";
import Home from "./components/Home/Home";

import { BrowserRouter, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LogIn/>} />
                <Route path="/register" element={<Register/>} />
                <Route path="/" element={<Home/>} />

            </Routes>
        </BrowserRouter>

    </div>
  );
}

export default App;
