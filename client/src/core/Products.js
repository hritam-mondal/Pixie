import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Base from "./Base";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then(data => {
            if (data?.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);

    return (
        <Base>
            <div className="featured-items">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Featured Items</h1>
                            </div>
                        </div>
                        <div class="featured container">
                            <div className="row">
                                {products.map((product, index) => {
                                    return (
                                        <Card product={product} key={index} product={product} />
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <br />
        </Base>
    )
}