import axios from "axios";
import { returnErrors } from "./errorActions";

import {
	USER_LOADED,
	USER_LOADING,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT_SUCCESS,
	REGISTER_SUCCESS,
	REGISTER_FAIL,
} from "./types";

//Load user with token
export const loadUser = () => (dispatch, getState) => {
	dispatch({ type: USER_LOADING });

	axios
		.get("/API/auth/user", tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: USER_LOADED,
				payload: res.data,
			})
		)
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({ type: AUTH_ERROR });
		});
};

//Register user
export const registerUser =
	({ username, password, email }) =>
	(dispatch) => {
		//Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		//Request body
		const body = JSON.stringify({ username, password, email });

		axios
			.post("API/users", body, config)
			.then((res) =>
				dispatch({
					type: REGISTER_SUCCESS,
					payload: res.data,
				})
			)
			.catch((err) => {
				dispatch(
					returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
				);
				dispatch({
					type: REGISTER_FAIL,
				});
			});
	};

//Setup headers and token
export const tokenConfig = (getState) => {
	//Get token from localStorage
	const token = getState().auth.token;

	//Headers
	const config = {
		headers: {
			"Content-type": "application/json",
		},
	};

	//Add token to headers if available
	if (token) {
		config.headers["x-auth-token"] = token;
	}

	return config;
};

//Login User
export const loginUser =
	({ email, password }) =>
	(dispatch) => {
		//Headers
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		//Request body
		const body = JSON.stringify({ email, password });

		axios
			.post("API/auth", body, config)
			.then((res) =>
				dispatch({
					type: LOGIN_SUCCESS,
					payload: res.data,
				})
			)
			.catch((err) => {
				dispatch(
					returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
				);
				dispatch({
					type: LOGIN_FAIL,
				});
			});
	};

//Logout
export const logout = () => {
	return {
		type: LOGOUT_SUCCESS,
	};
};
