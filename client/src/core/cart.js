import React, { useState, useEffect, Fragment } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";

const Cart = () => {
    const [products, setProducts] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        setProducts(loadCart());
    }, [reload]);

    const loadAllProducts = products => {
        return (
            <Fragment>
                <div className="featured-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="section-heading">
                                    <div className="line-dec"></div>
                                    <h1>All Items</h1>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <div id="filters">
                                    <StripeCheckout products={products} setReload={setReload}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="featured container no-gutter">
                    <div className="row posts">
                        <div className="row">
                            {products?.map((product, index) => (
                                <Card
                                    key={index}
                                    product={product}
                                    removeFromCart={true}
                                    addtoCart={false}
                                    setReload={setReload}
                                    reload={reload}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    const loadSingleProducts = products => {
        return (
            <Fragment>
                <div className="featured-page">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-12">
                                <div className="section-heading">
                                    <div className="line-dec"></div>
                                    <h1>All Items</h1>
                                </div>
                            </div>
                            <div className="col-md-8 col-sm-12">
                                <div id="filters">
                                    <StripeCheckout products={products} setReload={setReload}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="featured container no-gutter">
                    <div className="row posts">
                            {products?.map((product, index) => (
                                <Card
                                    key={index}
                                    product={product}
                                    removeFromCart={true}
                                    addtoCart={false}
                                    setReload={setReload}
                                    reload={reload}
                                    className="cardsing"
                                />
                            ))}
                    </div>
                </div>
            </Fragment>
        );
    };
    const loadCheckout = () => {
        return (
            <div>
                <h2>This section for checkout</h2>
            </div>
        );
    };

    return (
        <Base title="Cart Page" description="Ready to checkout">
            <div className="row">
                <div className="col">{products.length > 0 ? (products.length === 1 ? (loadSingleProducts(products)): (loadAllProducts(products))) : <h3 className="box">No products in cart</h3>}</div>
            </div>

        </Base>
    );
};

export default Cart;
