import {
	USER_LOGIN_FAIL,
	USER_LOGIN_REQUEST,
	USER_LOGIN_SUCCESS,
	USER_LOGOUT,
	USER_REGISTER_FAIL,
	USER_REGISTER_REQUEST,
	USER_REGISTER_SUCCESS,
} from '../actions/constants';

export const userLoginReducer = (state = {}, action) => {
	switch (action.type) {
		//when we receive the login request set loading to true
		case USER_LOGIN_REQUEST:
			return { loading: true };
		// if the login request is successful set userInfo to the payload
		case USER_LOGIN_SUCCESS:
			return { loading: false, userInfo: action.payload };
		// if the login request fails set error to the payload
		case USER_LOGIN_FAIL:
			return { loading: false, error: action.payload };
		// if we receive a logout request clear state
		case USER_LOGOUT:
			return {};
		default:
			return state;
	}
};

export const userRegisterReducer = (state = {}, action) => {
	switch (action.type) {
		//when we receive the register request set loading to true
		case USER_REGISTER_REQUEST:
			return { loading: true };
		// if the register request is successful set userInfo to the payload
		case USER_REGISTER_SUCCESS:
			return { loading: false, userInfo: action.payload };
		// if the register request fails set error to the payload
		case USER_REGISTER_FAIL:
			return { loading: false, error: action.payload };
		default:
			return state;
	}
};
