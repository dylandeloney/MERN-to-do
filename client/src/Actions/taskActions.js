import axios from "axios";
import { GET_TASK, ADD_TASK, DELETE_TASK, TASKS_LOADING } from "./types";

export const getTasks = () => (dispatch) => {
	dispatch(setTasksLoading());
	axios.get("/API/tasks").then((res) =>
		dispatch({
			type: GET_TASK,
			payload: res.data,
		})
	);
};

export const addTask = (task) => (dispatch) => {
	console.log("addTask triggered " + task);
	axios.post("/API/tasks", task).then((res) =>
		dispatch({
			type: ADD_TASK,
			payload: res.data,
		})
	);
};

export const deleteTask = (id) => (dispatch) => {
	axios.delete(`/API/tasks/${id}`).then((res) =>
		dispatch({
			type: DELETE_TASK,
			payload: id,
		})
	);
};

export const setTasksLoading = () => {
	return {
		type: TASKS_LOADING,
	};
};
