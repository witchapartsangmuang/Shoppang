import axios from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"
import "./../contents.css"
import "./Login.css"
function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const [iderror, setiderror] = useState("")
    const [passworderror, setpassworderror] = useState("")
    const validate_login = () => {
        console.log(username)
        console.log(password)
        if (username == "" || password == "" ) {
            alert("กรุณาระบบ username หรือ password ให้ถูกต้อง")
        } else {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/user/',
                params: { username: username, password: password }
            }).then(function (response) {
                console.log(response)
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
                        <img src="image/banner.png" />
                        <div className="brandname"><b>Shoppang</b></div>
                        <div className="brandtext">แหล่งช้อปปิ้งที่ของถูกไม่มี ของดีไม่ขาย อยากได้แค่กดซื้อเลย</div>
                    </div>
                    <div className="divrightside">
                        <div className="loginbox">
                            <div className="logintitle">เข้าสู่ระบบ</div>
                            <div className="divlogininfo">
                                <img className="loginicon" src="image/usernameicon.png" />
                                <input className="logininputbox" type="text" placeholder="ไอดีของผู้ใช้งาน" value={username} onChange={(event) => { setusername(event.target.value) }} />
                            </div>
                            <div>{iderror}</div>
                            <div className="divlogininfo">
                                <img className="loginicon" src="image/passwordicon.png" />
                                <input className="logininputbox" type="password" placeholder="รหัสผ่าน" value={password} onChange={(event) => { setpassword(event.target.value) }} />
                            </div>
                            <div>{passworderror}</div>
                            <div>
                                <div className="loginsubmit" onClick={validate_login}>เข้าสู่ระบบ</div>
                            </div>
                            <br />
                            เพิ่งเคยเข้ามาใน Shopee ใช่หรือไม่ ? <Link to="/register">สมัครใหม่</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login