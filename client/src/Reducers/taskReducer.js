import {
	GET_TASK,
	ADD_TASK,
	DELETE_TASK,
	TASKS_LOADING,
} from "../Actions/types";

const initialState = {
	tasks: [
		{
			id: 0,
			projectName: "Mailers",
			importance: 7,
			deadline: "01/01/2022",
			lead: "Dylan",
		},
		{
			id: 1,
			projectName: "SEO",
			importance: 8,
			deadline: "06/09/2022",
			lead: "Brittany",
		},
	],
	loading: false,
};
export default function (state = initialState, action) {
	switch (action.type) {
		case GET_TASK:
			return {
				...state,
			};
		case DELETE_TASK:
			return {
				...state,
				tasks: state.tasks.filter((task) => task.id !== action.payload),
			};
		default:
			return state;
	}
}
