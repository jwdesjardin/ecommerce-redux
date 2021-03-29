import {
	PRODUCT_LIST_SUCCESS,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_DETAILS_FAIL,
} from '../actions/constants';

export const productListReducer = (state = { data: null }, action) => {
	switch (action.type) {
		case PRODUCT_LIST_REQUEST:
			return { ...state, loading: true };
		case PRODUCT_LIST_SUCCESS:
			return {
				data: action.payload.products,
				loading: false,
			};
		case PRODUCT_LIST_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};

export const productDetailsReducer = (state = { data: {} }, action) => {
	switch (action.type) {
		case PRODUCT_DETAILS_REQUEST:
			return { ...state, loading: true };
		case PRODUCT_DETAILS_SUCCESS:
			return {
				data: action.payload,
				loading: false,
			};
		case PRODUCT_DETAILS_FAIL:
			return { error: action.payload, loading: false };
		default:
			return state;
	}
};
