import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../Actions/authActions";

function Logout() {
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const onLogout = () => {
		dispatch(logout());
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
