import { useEffect } from "react"
import "./../contents.css"
import "./Cart.css"
import ListCart from "../../components/ListCart/ListCart"

function Cart() {
    return (
        <div className="content">
            <div className="insidecontent">
                <ListCart />
            </div>
        </div>
    )
}
export default Cart