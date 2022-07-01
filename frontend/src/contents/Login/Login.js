import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import "./../contents.css"
import "./Login.css"

function Login() {

    const dispatch = useDispatch()

    const LoginUser = useSelector((state) => state.auth?.LoginUser)
    const UserCart = useSelector((state) => state.cart?.UserCart)

    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")

    const validate_login = () => {
        if (username === "" || password === "") {
            alert("กรุณาระบบ username หรือ password ให้ถูกต้อง")
        } else {
            dispatch.auth.fetchLoginUser({
                username: username,
                password: password
            })
        }
        setusername("")
        setpassword("")
    }

    return (
        <div className="content">
            <div className="insidecontent">
                <div className="divlogin">
                    <div className="divleftside">
                        <img src="image/banner.PNG" />
                        <div className="brandname"><b>Shoppang</b></div>
                        <div className="brandtext">แหล่งช้อปปิ้งที่ของถูกไม่มี ของดีไม่ขาย อยากได้แค่กดซื้อเลย</div>
                    </div>
                    <div className="divrightside">
                        <div className="loginbox">
                            <div className="logintitle">เข้าสู่ระบบ</div>
                            <div className="divlogininfo">
                                <img className="loginicon" src="image/usernameicon.PNG" />
                                <input className="logininputbox" type="text" placeholder="ไอดีของผู้ใช้งาน" value={username} onChange={(event) => { setusername(event.target.value) }} />
                            </div>
                            <div className="divlogininfo">
                                <img className="loginicon" src="image/passwordicon.PNG" />
                                <input className="logininputbox" type="password" placeholder="รหัสผ่าน" value={password} onChange={(event) => { setpassword(event.target.value) }} />
                            </div>
                            <div>
                                <div className="loginsubmit" onClick={validate_login}>เข้าสู่ระบบ</div>
                            </div>
                            <br />
                            เพิ่งเคยเข้ามาใน Shoppang ใช่หรือไม่ ? <Link to="/register">สมัครใหม่</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login