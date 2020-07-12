import React, { useState, useEffect } from "react";
import { isAutheticated } from "../auth/helper";
import { cartEmpty, loadCart } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import StripeCheckoutButton from 'react-stripe-checkout';
import { API } from "../backend";
import { createOrder } from "./helper/orderHelper";


const StripeCheckout = ({
    products,
    setReload = f => f,
    reload = undefined
}) => {
    const [data, setData] = useState({
        loading: false,
        success: false,
        error: "",
        address: ""
    });

    const token = isAutheticated() && isAutheticated().token;
    const userId = isAutheticated() && isAutheticated().user._id;

    const getFinalAmount = () => {
        let amount = 0;
        products.map(p => {
            amount = amount + p.price;
        });
        return amount.toFixed(2);
    };

    const makePayment = (token) => {
        const body = {
            token,
            products
        }
        const headers = {
            "Content-Type": "application/json"
        }
        return fetch(`${API}/stripepayment`, {
            method: "POST",
            headers,
            body: JSON.stringify(body)
        }).then(response => {
            console.log(response)
            const {status} = response;
            console.log("STATUS ", status);
            const orderData = {
                products: products
            }
            createOrder(userId, token, orderData);
            console.log("Order Created!");
            cartEmpty(() => {
                console.log("Did we got a crash?")
            });
            setReload(!reload);
        }).catch(err => console.log(err));
    };

    const showStripeButton = () => {
        return isAutheticated() ? (
            <StripeCheckoutButton
                stripeKey="pk_test_51H3MP1JPwKjtrUVZKzpEcHhHKcI0P3KUiiKjxK6RB6uh6wnEWTeYkNsvQGytkH5QghuTOF6Owkoqrt17t5GqIeum008m33H4nU"
                token={makePayment}
                amount={getFinalAmount() * 100}
                name="Buy Products"
                shippingAddress
                billingAddress
            >
                <button className="btn btn-sm btn-success">Pay with stripe</button>
            </StripeCheckoutButton>
        ) : (
                <Link to="/signin">
                    <button className="btn btn-sm btn-warning">Signin</button>
                </Link>
            );
    };

    return (
        <div id="filters" className="button-group">
            <button className="btn btn-primary" data-filter="*">Final Amount: ${getFinalAmount()} {showStripeButton()}</button>
        </div>
    );
};

export default StripeCheckout;
