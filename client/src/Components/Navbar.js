import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<div>
			<header className="bg-blue-600">
				<div className=" mx-auto flex justify-between container">
					<nav className="flex">
						<NavLink
							to="/"
							exact
							className="inline-flex items-center py-2 px-3 my-3 rounded text-blue-200 hover:text-green-800 text-2xl"
							activeClassName="text-white">
							Home
						</NavLink>
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
				</div>
			</header>
		</div>
	);
}

export default Navbar;
