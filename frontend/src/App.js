import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Header from './components/Header/Header';
import Home from './contents/Home/Home';
import Login from "./contents/Login/Login";
import Register from "./contents/Register/Register";
import Cart from './contents/Cart/Cart'
import ProductOrder from "./contents/ProductOrder/ProductOrder";

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/cart" element={<Cart/>}/>
          <Route exact path="/login" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/catagory/:catagoryid" element={<Home/>}/>
          <Route exact path="/product/:productid" element={<ProductOrder/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
