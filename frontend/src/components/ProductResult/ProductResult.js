import axios from "axios"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from "react-router-dom";

import "./../components.css"
import "./ProductResult.css"

function ProductResult() {
    const { catagoryid } = useParams()
    const [product, setproduct] = useState([])
    const get_product = () => {
        if (catagoryid) {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/category/' + catagoryid + "/"
            }).then(function (response) {
                setproduct(response.data.data.products)
            })
        } else {
            axios({
                method: 'get',
                url: 'http://127.0.0.1:8000/products/'
            }).then(function (response) {
                setproduct(response.data.data)
            })
        }
    }
    useEffect(() => {
        get_product()
    }, [catagoryid])

    return (
        <>
            <div className="component_title">
                <span className="title_name">ProductResult</span>
            </div>
            <div className="product_result">
                {
                    product.length > 0 ?
                    product.map((val) => {
                        const pathname = "/product/" + val.id
                        return (
                            <div className="divproduct" key={val.id}>
                                <Link to={pathname}>
                                    <img className="product_image" src={val.img} />
                                    <div className="product_info">
                                        <p><b>{val.name}</b></p>
                                        <p>{val.detail}</p>
                                        <p>${val.price}</p>
                                    </div>
                                </Link>
                            </div>
                        )
                    }): <div>ไม่มีข้อมูล</div>
                }
            </div>
        </>
    )
}
export default ProductResult
