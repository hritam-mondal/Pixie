import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({ product, addtoCart = true, removeFromCart = false, setReload = f => f, reload = undefined }) => {
	const [redirect, setRedirect] = useState(false);
	const [count, setCount] = useState(product.count);

	const cartTitle = product ? product.name : "A photo from pexels";
	const price = product ? product.price : "0";
	const cartDescrption = product ? product.description : "Default description";
	const cartPrice = product ? product.price : "DEFAULT";

	const addToCart = () => {
		addItemToCart(product, () => setRedirect(true));
	};

	const getARedirect = redirect => {
		if (redirect) {
			return <Redirect to="/cart" />;
		}
	};

	const showAddToCart = addtoCart => {
		return (
			addtoCart && (
				<button
					onClick={addToCart}
					className="btn btn-block btn-outline-primary mt-2 mb-2"
				>
					Add to Cart
				</button>
			)
		);
	};

	const showRemoveFromCart = removeFromCart => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id);
						setReload(!reload)
					}}
					className="btn btn-block btn-outline-danger mt-2 mb-2"
				>
					Remove from cart
				</button>
			)
		);
	};
	return (
		<div className="col-md-4">
			<div className="card mb-4 shadow-sm">
				{getARedirect(redirect)}
				<ImageHelper product={product} />
				<div className="card-body">
					<h5 className="card-title">{cartTitle}</h5>
					<p className="card-text">{cartDescrption}</p>
					<span><b>${price}</b></span>
					{showAddToCart(addtoCart)}
					{showRemoveFromCart(removeFromCart)}
				</div>
			</div>
		</div>
	);
};

export default Card;
