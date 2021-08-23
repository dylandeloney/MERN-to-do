import axios from "axios";
import { GET_TASK, ADD_TASK, DELETE_TASK, TASKS_LOADING } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getTasks = () => (dispatch) => {
	dispatch(setTasksLoading());
	axios
		.get("/API/tasks")
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

export const setTasksLoading = () => {
	return {
		type: TASKS_LOADING,
	};
};
