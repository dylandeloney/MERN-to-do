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
} from "../Actions/types";

const initialState = {
	selectedContacts: [],
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
				contacts: [...state.contacts, action.payload],
			};
		case GET_SINGLE_CONTACT:
			return {
				...state,
				currentContact: [action.payload],
			};
		case CLEAR_CURRENT_CONTACT:
			return {
				...state,
				currentContact: [],
			};
		case EDIT_CONTACT:
			return {
				...state,
				contacts: state.contacts
					.filter((contact) => {
						return contact._id !== action.payload._id; //delete matched data
					})
					.concat(action.payload), //concats new data
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: [],
				selectedContacts: [],
			};
		case SEARCH_CONTACTS_BY_OCCUPATION:
			return {
				...state,
				contacts: action.payload,
			};

		default:
			return state;
	}
}
