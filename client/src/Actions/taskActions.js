import axios from "axios";
import {
	GET_TASK,
	ADD_TASK,
	DELETE_TASK,
	TASKS_LOADING,
	CLEAR_TASKS,
	EDIT_TASK,
	GET_SINGLE_TASK,
	CLEAR_CURRENT_TASK,
} from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTasks = (id) => (dispatch) => {
	dispatch(setTasksLoading());
	axios
		.get(`/API/tasks/${id}`)
		.then((res) =>
			dispatch({
				type: GET_TASK,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const addTask = (task) => (dispatch, getState) => {
	axios
		.post("/API/tasks", task, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: ADD_TASK,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const deleteTask = (id) => (dispatch, getState) => {
	axios
		.delete(`/API/tasks/${id}`, tokenConfig(getState))
		.then((res) =>
			dispatch({
				type: DELETE_TASK,
				payload: id,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const editTask = (id, updateData) => (dispatch) => {
	axios
		.post(`/API/tasks/view/${id}`, updateData)
		.then((res) =>
			dispatch({
				type: EDIT_TASK,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const getSingleTask = (id) => (dispatch) => {
	axios
		.get(`/API/tasks/view/${id}`)
		.then((res) =>
			dispatch({
				type: GET_SINGLE_TASK,
				payload: res.data,
			})
		)
		.catch((err) =>
			dispatch(returnErrors(err.response.data, err.response.status))
		);
};

export const clearTasks = () => {
	return {
		type: CLEAR_TASKS,
	};
};

export const clearCurrentTask = () => {
	return {
		type: CLEAR_CURRENT_TASK,
	};
};

export const setTasksLoading = () => {
	return {
		type: TASKS_LOADING,
	};
};
