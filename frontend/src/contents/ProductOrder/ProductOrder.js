import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import "./../contents.css"
import "./ProductOrder.css"

function ProductOrder() {
    const { productid } = useParams()
    const [productdetail, setproductdetail] = useState()
    const [numberorder, setnumberorder] = useState(0)
    const get_productdetail = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/product/' + productid + "/"
        }).then(function (response) {
            setproductdetail(response.data.data)
            console.log(response)
        })
    }

    if (numberorder < 0) {
        setnumberorder(0)
    }

    useEffect(() => {
        get_productdetail()
    }, [])
    return (
        <div className="content">
            <div className="insidecontent">
                <div className="product_detail">
                    <img src={productdetail?.img} className="product_detail_image" />
                    <p><b>{productdetail?.name}</b></p>
                    <p>{productdetail?.detail}</p>
                    <p>${productdetail?.price}</p>
                </div>
                <div className="divnumberproduct">
                    <div className="minutenumberorder" onClick={() => { setnumberorder(numberorder - 1) }}>-</div>
                    <div className="numberorderdisplay">{numberorder}</div>
                    <div className="plusnumberorder" onClick={() => { setnumberorder(numberorder + 1) }}>+</div>
                </div>
                <div className="divbutton">
                    <div className="AddToCartButton">
                        <img src="/image/basket2.jpg" />
                        <p>add to cart</p>
                    </div>
                    <span></span>
                    <div className="BuyButton">
                        <p>buy</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductOrder