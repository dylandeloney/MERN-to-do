import { GET_TASK, ADD_TASK, DELETE_TASK } from "./types";

export const getTasks = () => {
	return {
		type: GET_TASK,
	};
};

export function deleteTask(id) {
	return {
		type: DELETE_TASK,
		payload: id,
	};
}
