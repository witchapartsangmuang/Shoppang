import axios from "axios"
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./../components.css"
import "./Category.css"

function Category() {
    const [category, setcategory] = useState([])
    const get_category = () => {
        axios({
            method: 'get',
            url: 'http://127.0.0.1:8000/categories/'
        }).then(function (response) {
            setcategory(response.data.data)
        })
    }
    useEffect(() => {
        get_category()
    }, [])
    return (
        <>
            <div className="component_title">
                <span className="title_name">หมวดหมู่</span>
            </div>
            <div className="divcategory">
                {category.map((val) => {
                    const pathname = "/catagory/" + val.id
                    return (
                        <div className="category_item" key={val.id}>
                            <Link to={pathname}>
                                <img className="category_image" src={val.img} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
export default Category
