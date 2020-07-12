import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import Base from "./Base";
import { isAutheticated } from "../auth/helper";
import { Link } from "react-router-dom";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState(false);

    const loadAllProduct = () => {
        getProducts().then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProducts(data);
            }
        });
    };

    useEffect(() => {
        loadAllProduct();
    }, []);

    const feacheredItem = () => {
        return (
            <div className="row posts">
                <div id="1" className="item new col-md-4">
                    <a>
                        <div className="featured-item">
                            <img src="assets/images/product-01.jpg" alt="" />
                            <h4>Proin vel ligula</h4>
                            <h6>$15.00</h6>
                        </div>
                    </a>
                </div>
                <div id="2" className="item high col-md-4">
                    <a>
                        <div className="featured-item">
                            <img src="assets/images/product-02.jpg" alt="" />
                            <h4>Erat odio rhoncus</h4>
                            <h6>$25.00</h6>
                        </div>
                    </a>
                </div>
                <div id="3" className="item low col-md-4">
                    <a>
                        <div className="featured-item">
                            <img src="assets/images/product-03.jpg" alt="" />
                            <h4>Integer vel turpis</h4>
                            <h6>$35.00</h6>
                        </div>
                    </a>
                </div>
            </div>
        );
    }

    return (
        <Base>
            <div className="banner">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="caption">
                                {(isAutheticated() && <h2>Welcome, {isAutheticated().user.fullname}</h2>)}
                                {(!isAutheticated() && <h2>Get the Latest Fashion</h2>)}
                                <div className="line-dec mb-3"></div>

                                <p>With the trendiest, freshest, and most unique styles from across the world, PIXIE invites you to express your personal style fearlessly, and with a confidence and optimism that cannot be easily shaken.
                                    <br /><br />We bring you the trendiest and most exclusive brands from around the world to your wardrobe. Forget scouring the net for what’s hot globally, we’ve got you covered.</p>
                                {(isAutheticated() && <div className="main-button">
                                    <Link to="/products">Order Now!</Link>
                                </div>)}
                                {(!isAutheticated() && <div className="main-button">
                                    <Link to="/signin">Order Now! </Link>
                                </div>)}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="featured-items">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="section-heading">
                                <div className="line-dec"></div>
                                <h1>Featured Items</h1>
                            </div>
                        </div>
                        {feacheredItem()}
                    </div>
                </div>
            </div>
        </Base>
    );
}