import React, { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { deleteTask, getTasks, clearTasks } from "../Actions/taskActions";
import CreateTaskForm from "./CreateTaskForm";

const dayjs = require("dayjs");

function Tasks() {
	const dispatch = useDispatch();
	const task = useSelector((state) => state.task.tasks);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.isAuthenticated === true) {
			dispatch(getTasks(auth.user.id));
		} else {
			dispatch(clearTasks());
		}
	}, [auth]);

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
						<tr key={task._id}>
							<td>{task.name}</td>
							<td>{task.importance}</td>
							<td>{dayjs(task.deadline).add(1, "day").format("MM/DD/YYYY")}</td>
							<td>{task.lead}</td>
							<td>
								<button className="justify-left border-2 border-gray-600 text-gray-600 bg-white rounded-md mr-1 px-2 py-2 my-2">
									<span>
										<FaEdit />
									</span>
								</button>
								<button
									onClick={() => onDeleteClick(task._id)}
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
