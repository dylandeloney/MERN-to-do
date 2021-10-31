import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import {
	getSingleTask,
	deleteTask,
	getTasks,
	clearTasks,
	clearCurrentTask,
} from "../Actions/taskActions";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskModal from "./EditTaskModal";

const dayjs = require("dayjs");

function Tasks() {
	const dispatch = useDispatch();
	const task = useSelector((state) => state.task.tasks);
	const auth = useSelector((state) => state.auth);
	let [visible, setVisible] = useState(false);

	useEffect(() => {
		if (auth.isAuthenticated === true || visible) {
			dispatch(getTasks(auth.user.id));
		} else {
			dispatch(clearTasks());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	const onDeleteClick = (id) => {
		setTimeout(() => {
			dispatch(deleteTask(id));
		}, 500);
	};

	const toggle = (id) => {
		setVisible((visible = !visible));
		if (visible === true) {
			dispatch(getSingleTask(id));
		} else {
			dispatch(clearCurrentTask());
		}
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
							<td className="inline-flex">
								<Modal isOpen={visible} toggle={toggle} className="p-0">
									<EditTaskModal />
								</Modal>
								<button
									key={task.id}
									onClick={() => toggle(task._id)}
									className=" border-2 border-gray-600 text-gray-600 bg-white rounded-md justify-left px-2 py-2 my-2 mr-1">
									<span>
										<FaEdit />
									</span>
								</button>
								<button
									onClick={() => onDeleteClick(task._id)}
									className="jusity-right border-2 text-red-400 border-red-400 bg-white  rounded-md px-2 ml-1 py-2 my-2">
									<span>
										<FaTrash />
									</span>
								</button>{" "}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Tasks;
