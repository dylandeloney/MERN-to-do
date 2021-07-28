import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask } from "../Actions/taskActions";
import CreateTaskForm from "./CreateTaskForm";

function Tasks() {
	const task = useSelector((state) => state.task.tasks);
	const dispatch = useDispatch();
	const onDeleteClick = (id) => {
		setTimeout(() => {
			dispatch(deleteTask(id));
		}, 500);
	};

	return (
		<div>
			<CreateTaskForm />
			<table className="w-full  m-auto">
				<thead>
					<tr className="bg-gray-500 py-2 my-2 text-xl">
						<td>Project Title</td>
						<td>Importance</td>
						<td>Deadline</td>
						<td>Lead</td>
						<td>Options</td>
					</tr>
				</thead>
				<tbody>
					{task.map((task) => (
						<tr key={task.id}>
							<td>{task.projectName}</td>
							<td>{task.importance}</td>
							<td>{task.deadline}</td>
							<td>{task.lead}</td>
							<td>
								<button className="justify-left border-2 border-gray-600 text-gray-600 bg-white rounded-md mr-1 px-2 py-2 my-2">
									<span>
										<FaEdit />
									</span>
								</button>
								<button
									onClick={() => onDeleteClick(task.id)}
									key={task.id}
									className="jusity-right border-2 text-red-400 border-red-400 bg-white  rounded-md px-2 ml-1 py-2 my-2">
									<span>
										<FaTrash />
									</span>
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Tasks;
