import { GET_TASK, ADD_TASK, DELETE_TASK } from "./types";

export const getTasks = () => {
	return {
		type: GET_TASK,
	};
};

export const deleteTask = (id) => {
	return {
		type: DELETE_TASK,
		payload: id,
	};
};

export const addTask = (task) => {
	return {
		type: ADD_TASK,
		payload: task,
	};
};

export const setTasksLoading = () => {
	return {
		type: TASKS_LOADING,
	};
};
