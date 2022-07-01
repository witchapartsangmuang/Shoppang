import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import "./../contents.css"
import "./ProductOrder.css"

function ProductOrder() {
    const { productid } = useParams()

    const LoginUser = useSelector((state) => state.auth?.LoginUser)

    const [productdetail, setproductdetail] = useState()
    const [numberorder, setnumberorder] = useState(0)

    const get_productdetail = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/product/' + productid + "/"
        }).then(function (response) {
            setproductdetail(response.data.data)
        }).catch(function (response) {
            console.log('error : ', response)
        })
    }
    const addtocart = () => {
        axios.post('http://127.0.0.1:8000/carts/', {
            product: productdetail.id,
            quantity: numberorder
        }, {
            headers: {
                Authorization: `Bearer ${LoginUser.access}`
            }
        }
        ).then(function (response) {
            console.log(response.data.data)
            alert('add to your cart successfully.')
            window.location.href = '/'
        }).catch(function (response) {
            console.log(response.response)
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
                        <p onClick={addtocart}>add to cart</p>
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