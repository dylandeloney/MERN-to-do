import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../Actions/authActions";
import { clearContacts } from "../../Actions/contactActions";
import { clearTasks } from "../../Actions/taskActions";

function Logout() {
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(logout());
		dispatch(clearContacts());
		dispatch(clearTasks());
	};

	return (
		<div>
			<button
				onClick={onLogout}
				className="inline-flex items-center py-3 px-3 my-3 rounded text-blue-200 text-xl hover:text-green-800">
				Logout
			</button>
		</div>
	);
}

export default Logout;
