import axios from "axios";
import {
	GET_CONTACTS,
	ADD_CONTACT,
	DELETE_CONTACT,
	GET_SINGLE_CONTACT,
	CLEAR_CURRENT_CONTACT,
	EDIT_CONTACT,
	CLEAR_CONTACTS,
	SEARCH_CONTACTS_BY_OCCUPATION,
	// UNSELECT_CONTACT,
	// SELECT_CONTACT,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getContacts = (id) => (dispatch) => {
	axios
		.get(`/API/contacts/${id}`)
		.then((res) =>
			dispatch({
				type: GET_CONTACTS,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addContact = (contact) => (dispatch, getState) => {
	axios
		.post("/API/contacts", contact, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_CONTACT,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteContact = (id) => (dispatch) => {
	axios
		.delete(`/API/contacts/${id}`)
		.then(
			dispatch({
				type: DELETE_CONTACT,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getSingleContact = (id) => (dispatch) => {
	axios
		.get(`/API/contacts/view/${id}`)
		.then((res) =>
			dispatch({
				type: GET_SINGLE_CONTACT,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const clearCurrentContact = () => {
	return {
		type: CLEAR_CURRENT_CONTACT,
	};
};

export const editContact = (id, updateData) => (dispatch) => {
	axios
		.post(`/API/contacts/view/${id}`, updateData)
		.then((res) =>
			dispatch({
				type: EDIT_CONTACT,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const clearContacts = () => {
	return {
		type: CLEAR_CONTACTS,
	};
};

export const searchContactsByOccupation = (id, keyword) => (dispatch) => {
	axios
		.get(`/API/contacts/${id}/${keyword}`)
		.then((res) =>
			dispatch({
				type: SEARCH_CONTACTS_BY_OCCUPATION,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

// export const unselectContact = (id) => {
// 	return {
// 		type: UNSELECT_CONTACT,
// 		payload: id,
// 	};
// };

// export const selectContact = (id) => {
// 	return {
// 		type: SELECT_CONTACT,
// 		payload: id,
// 	};
// };
