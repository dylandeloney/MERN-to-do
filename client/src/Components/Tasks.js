import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

function Tasks() {
	return (
		<div className="">
			<Link to="/create">
				<button className="float-left bg-red-400 py-2 px-4 mx-2 my-2 rounded-md">
					Create Task
				</button>
			</Link>
			<table className="w-full  m-auto">
				<tr className="bg-gray-500 py-2 my-2 text-xl">
					<td>Project Title</td>
					<td>Importance</td>
					<td>Deadline</td>
					<td>Lead</td>
					<td>Options</td>
				</tr>
				<tr>
					<td>Send Marketing Letter</td>
					<td>8</td>
					<td>07/01/2021</td>
					<td>Forest Gump</td>
					<td>
						<button className="justify-left border-2 border-gray-600 text-gray-600 bg-white rounded-md mr-1 px-2 py-2 my-2">
							<span>
								<FaEdit />
							</span>
						</button>
						<button className="jusity-right border-2 text-red-400 border-red-400 bg-white  rounded-md px-2 ml-1 py-2 my-2">
							<span>
								<FaTrash />
							</span>
						</button>
					</td>
				</tr>
			</table>
		</div>
	);
}

export default Tasks;
