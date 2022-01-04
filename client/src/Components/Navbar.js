import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Logout from "./auth/Logout";
import LoginModal from "./auth/LoginModal";

function Navbar() {
	const auth = useSelector((state) => state.auth);

	return (
		<div>
			<header className="bg-blue-600">
				<div className=" mx-auto flex justify-between container">
					<nav className="flex">
						<NavLink
							to="/CRM"
							className="inline-flex items-center py-3 px-3 my-3 rounded text-blue-200 hover:text-green-800"
							activeClassName="text-blue-100 bg-blue-700">
							CRM
						</NavLink>
						<NavLink
							to="/calendar"
							className="inline-flex items-center py-3 px-3 my-3 rounded text-blue-200 hover:text-green-800"
							activeClassName="text-blue-100 bg-blue-700">
							Calendar
						</NavLink>
						<NavLink
							to="/Tasks"
							className="inline-flex items-center py-3 px-3 my-3 rounded text-blue-200 hover:text-green-800"
							activeClassName="text-blue-100 bg-blue-700">
							Tasks
						</NavLink>
					</nav>
					{auth.isAuthenticated ? <Logout /> : <LoginModal />}
					{/* <RegisterModal /> */}
				</div>
			</header>
		</div>
	);
}

export default Navbar;
