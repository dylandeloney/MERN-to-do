import { GET_CONTACTS, ADD_CONTACT, DELETE_CONTACT } from "../Actions/types";

const initialState = {
	currentContact: [],
	contacts: [],
	loading: false,
};
export default function contactReducer(state = initialState, action) {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loading: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
			};

		default:
			return state;
	}
}
