import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams, useLocation } from "react-router-dom";
import "./../components.css"
import "./Header.css"

function Header() {

    const dispatch = useDispatch()
    const LoginUser = useSelector((state) => state.auth?.LoginUser)
    const UserCart = useSelector((state) => state.cart?.UserCart)

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
        if (urlpath.pathname == "/login" || urlpath.pathname == "/register" || LoginUser.length == 0) {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                </div>
            )
        } else {
            return (
                <div style={{ margin: "20px 5px 15px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                    <Link to="/cart" className="cart">
                        <img className="cart_image" src="image/basket.PNG" />
                        <div className="numberproductincart"><p>{UserCart.length}</p></div>
                    </Link>
                </div>
            )
        }
    }
    const UserInfo = () => {
        if (LoginUser.length == 0) {
            return (
                <>
                    <div style={{ margin: "30px 5px 25px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                        <Link to="/login" className="login">
                            <div className="login_box"><p>Login</p></div>
                        </Link>
                    </div>
                    <div style={{ margin: "30px 5px 25px 5px", width: "10%", display: "flex", justifyContent: "center" }}>
                        <Link to="/register" className="register">
                            <div className="register_box"><p>Register</p></div>
                        </Link>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div style={{ margin: "30px 5px 25px 5px", width: "13%", display: "flex", justifyContent: "center" }}>
                        <img className="userimg" src="image/usernameicon.PNG" /><p className="userid">{LoginUser.user}</p>
                    </div>
                    <div style={{ margin: "30px 5px 25px 5px", width: "7%", display: "flex", justifyContent: "center" }}>
                        <div className="logout">
                            <div className="logout_box" onClick={logout}><p>logout</p></div>
                        </div>
                    </div>
                </>
            )
        }
    }
    const logout = () => {
        dispatch.auth.SET_USER_LOGIN([])
        window.location.href = '/'
    }

    useEffect(() => {
        UserInfo()
        dispatch.cart.fetchGetUserCart({
            useraccess: LoginUser.access
        })
    }, [])

    useEffect(() => {
        Search()
        Cart()
        UserInfo()
    }, [urlpath])

    return (
        <div className="Header">
            <Link to="/" className="banner">
                <div style={{ width: "25%", minWidth: "80px" }}>
                    <img className="banner_image" src="image/banner.PNG" />
                </div>
                <div style={{ paddingTop: "10px", width: "75%", minWidth: "200px" }}>
                    <span className="banner_name">Shoppang</span>
                </div>
            </Link>
            <Search />
            <Cart />
            <UserInfo />
        </div>
    )
}
export default Header