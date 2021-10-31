import axios from "axios";
import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getContacts = () => (dispatch) => {
	axios
		.get(`/API/contacts/`)
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
