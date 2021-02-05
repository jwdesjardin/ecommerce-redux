import axios from 'axios';
import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_SHIPPING_ADDRESS,
	CART_SAVE_PAYMENT_METHOD,
} from '../actions/constants';

export const addToCart = (id, qty) => async (dispatch, getState) => {
	// get data - send get request to server
	const { data } = await axios.get(`/api/products/${id}`);

	// sends action to reducer; payload shapes the above data
	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	//set localStorage to the cartItems list from current state
	localStorage.setItem('cartItems', JSON.stringify(getState().shoppingCart.cartItems));
};

export const removeFromCart = id => async (dispatch, getState) => {
	// sends action to reducer, payload is the id of the product to remove
	dispatch({
		type: CART_REMOVE_ITEM,
		payload: id,
	});

	//set localStorage to the cartItems list from current state
	localStorage.setItem('cartItems', JSON.stringify(getState().shoppingCart.cartItems));
};

export const saveShippingAddress = data => async dispatch => {
	//
	dispatch({
		type: CART_SAVE_SHIPPING_ADDRESS,
		payload: data,
	});

	//
	localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = data => async dispatch => {
	//
	dispatch({
		type: CART_SAVE_PAYMENT_METHOD,
		payload: data,
	});

	//
	localStorage.setItem('paymentMethod', JSON.stringify(data));
};
