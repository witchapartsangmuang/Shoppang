import "./../contents.css"
import "./Register.css"
import { Link } from "react-router-dom"
function Register() {
    return (
        <div className="content">
            <div className="insidecontent">
                <div className="outsidedivregister">
                    <div className="headerregister">
                        <p>REGISTER</p>
                    </div>
                    <div className="divregister">
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="text" placeholder="ไอดีผู้ใช้งาน" />
                        </div>
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="password" placeholder="รหัสผ่าน" />
                        </div>
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="password" placeholder="ยืนยันรหัสผ่าน" />
                        </div>
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="text" placeholder="ชื่อ" />
                        </div>
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="text" placeholder="นามสกุล" />
                        </div>
                        <div className="divregisterinfo">
                            <input className="registerinputbox" type="email" placeholder="อีเมลล์" />
                        </div>
                    </div>
                    <div className="registerbutton">
                        <p>Register</p>
                    </div>
                    <div className="footerregister">
                        <p>Do you have account ? <Link to="/login">login</Link></p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Register