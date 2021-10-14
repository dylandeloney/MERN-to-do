import {
	GET_TASK,
	GET_SINGLE_TASK,
	ADD_TASK,
	EDIT_TASK,
	DELETE_TASK,
	TASKS_LOADING,
	CLEAR_TASKS,
	CLEAR_CURRENT_TASK,
} from "../Actions/types";

const initialState = {
	currentTask: [],
	tasks: [],
	loading: false,
};
export default function taskReducer(state = initialState, action) {
	switch (action.type) {
		case GET_TASK:
			return {
				...state,
				tasks: action.payload,
				loading: false,
			};
		case DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task._id !== action.payload),
			};
		case ADD_TASK:
			return {
				...state,
				tasks: [action.payload, ...state.tasks],
			};
		case EDIT_TASK:
			return {
				...state,
				tasks: state.tasks
					.filter((task) => {
						return task._id !== action.payload._id; //delete matched data
					})
					.concat(action.payload), //concats new data
			};
		case TASKS_LOADING:
			return {
				...state,
				loading: true,
			};
		case CLEAR_TASKS:
			return {
				...state,
				tasks: [],
			};
		case GET_SINGLE_TASK:
			return {
				...state,
				currentTask: [action.payload],
			};
		case CLEAR_CURRENT_TASK:
			return {
				...state,
				currentTask: [],
			};
		default:
			return state;
	}
}
