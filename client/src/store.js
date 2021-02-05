// create our redux store

// conect reducers middleware

import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

//bring in redusers
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';

// combine multiple reducers
const reducer = combineReducers({
	productList: productListReducer,
	productDetails: productDetailsReducer,
	shoppingCart: cartReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
	? JSON.parse(localStorage.getItem('cartItems'))
	: [];

// const userInfoFromStorage = localStorage.getItem('userInfo')
// 	? JSON.parse(localStorage.getItem('userInfo'))
// 	: null;

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
// 	? JSON.parse(localStorage.getItem('shippingAddress'))
// 	: {};

const initialState = {
	shoppingCart: {
		cartItems: cartItemsFromStorage,
		// shippingAddress: shippingAddressFromStorage
	},
	// userLogin: {
	// 	userInfo: userInfoFromStorage
	// }
};

// allows async actions
const middleware = [ thunk ];

// create store
const store = createStore(
	reducer,
	initialState,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
