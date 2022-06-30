import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import "./../components.css"
import "./Header.css"

function Header() {
    const urlpath = useLocation()
    const Search = () => {
        if (urlpath.pathname == "/cart" || urlpath.pathname == "/login" || urlpath.pathname == "/register") {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "35%" }}>
                </div>
            )
        } else {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "35%" }}>
                    <input className="inputsearch" type="text" placeholder="ค้นหาสินค้า" />
                </div>
            )
        }
    }
    const Cart = () => {
        if (urlpath.pathname == "/login" || urlpath.pathname == "/register") {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                </div>
            )
        } else {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                    <Link to="/cart" className="cart">
                        <img className="cart_image" src="image/basket.png" />
                    </Link>
                </div>
            )
        }
    }
    useEffect(() => {
        Search()
        Cart()
    }, [urlpath])
    return (
        <div className="Header">
            <Link to="/" className="banner">
                <div style={{ width: "25%", minWidth: "80px" }}>
                    <img className="banner_image" src="image/banner.png" />
                </div>
                <div style={{ paddingTop: "10px", width: "75%", minWidth: "200px" }}>
                    <span className="banner_name">Shoppang</span>
                </div>
            </Link>
            <Search />
            <Cart />
            <div style={{ margin: "30px 5px 25px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                <Link to="/login" className="login">
                    <div className="login_box">Login</div>
                </Link>
            </div>
            <div style={{ margin: "30px 5px 25px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                <Link to="/register" className="register">
                    <div className="register_box">Register</div>
                </Link>
            </div>
        </div>
    )
}
export default Header