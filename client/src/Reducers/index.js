import { combineReducers } from "redux";
import taskReducer from "./taskReducer";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import contactReducer from "./contactReducer";

export default combineReducers({
	task: taskReducer,
	error: errorReducer,
	auth: authReducer,
	contact: contactReducer,
});
