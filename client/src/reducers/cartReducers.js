import {
	CART_ADD_ITEM,
	CART_REMOVE_ITEM,
	CART_SAVE_PAYMENT_METHOD,
	CART_SAVE_SHIPPING_ADDRESS,
} from '../actions/constants';

export const cartReducer = (state = { cartItems: [], shippingAddress: {} }, action) => {
	switch (action.type) {
		case CART_ADD_ITEM:
			// find if the payload is already in the state
			const item = action.payload;
			const existItem = state.cartItems.find(x => x.product === item.product);

			// if the product already exists
			if (existItem) {
				// return state, overwrite the existItem in the cartsItems array
				return {
					...state,
					cartItems: state.cartItems.map(x => (x.product === existItem.product ? item : x)),
				};

				// else the product is new
			} else {
				// return state, add the item to the cartItems array
				return {
					...state,
					cartItems: [ ...state.cartItems, item ],
				};
			}
		case CART_REMOVE_ITEM:
			// return state, remove an item from the cartItems array where payload id matches
			return {
				...state,
				cartItems: state.cartItems.filter(x => x.product !== action.payload),
			};
		case CART_SAVE_SHIPPING_ADDRESS:
			//
			return {
				...state,
				shippingAddress: action.payload,
			};
		case CART_SAVE_PAYMENT_METHOD:
			//
			return {
				...state,
				paymentMethod: action.payload,
			};
		// default maintain state
		default:
			return state;
	}
};
