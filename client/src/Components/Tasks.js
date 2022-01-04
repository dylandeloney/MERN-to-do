import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSortBy, useTable } from "react-table";
import {
	getSingleTask,
	deleteTask,
	getTasks,
	clearTasks,
	clearCurrentTask,
} from "../Actions/taskActions";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Modal } from "reactstrap";
import CreateTaskForm from "./CreateTaskForm";
import EditTaskModal from "./EditTaskModal";
var dayjs = require("dayjs");

function Tasks() {
	const dispatch = useDispatch();
	const tasks = useSelector((state) => state.task.tasks);
	const auth = useSelector((state) => state.auth);
	const data = useMemo(() => tasks, [tasks]);

	useEffect(() => {
		if (auth.isAuthenticated === true && auth.user._id != null) {
			dispatch(getTasks(auth.user._id));
		} else {
			dispatch(clearTasks());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	//delete button click event
	const onDeleteClick = useCallback(
		(id) => {
			setTimeout(() => {
				dispatch(deleteTask(id));
			}, 500);
		},
		[dispatch]
	);

	const columns = useMemo(
		() => [
			{
				Header: "Project Title",
				accessor: "name", // accessor is the "key" in the data
			},
			{
				Header: "Importance",
				accessor: "importance", // accessor is the "key" in the data
			},
			{
				Header: "Deadline",
				accessor: (row) =>
					dayjs(row.deadline).add(1, "day").format("MM/DD/YYYY"),
			},
			{
				Header: "Lead",
				accessor: "lead",
			},
			{
				Header: "Options",
				Cell: (data) => {
					let [visible, setVisible] = useState(false);

					const rowId = data.row.original._id;
					//toggle editContactForm Modal
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
							<Modal isOpen={visible} toggle={toggle} className="p-0">
								<EditTaskModal />
							</Modal>
							<button
								onClick={() => toggle(rowId)}
								className=" border-2 border-gray-600 text-gray-600 bg-white rounded-md justify-left px-2 py-2 my-2 mr-1">
								<span>
									<FaEdit />
								</span>
							</button>
							<button
								onClick={() => onDeleteClick(rowId)}
								className="jusity-right border-2 text-red-400 border-red-400 bg-white  rounded-md px-2 ml-1 py-2 my-2">
								<span>
									<FaTrash />
								</span>
							</button>{" "}
						</div>
					);
				},
			},
		],

		[onDeleteClick, dispatch]
	);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({ columns, data }, useSortBy);

	return (
		<div>
			<CreateTaskForm />
			<table
				{...getTableProps()}
				style={{ border: "solid 1px blue" }}
				className="w-full m-auto">
				<thead>
					{headerGroups.map((headerGroup) => (
						<tr {...headerGroup.getHeaderGroupProps()}>
							{headerGroup.headers.map((column) => (
								<th
									{...column.getHeaderProps(column.getSortByToggleProps())}
									style={{
										borderBottom: "solid 3px red",
										background: "aliceblue",
										color: "black",
										fontWeight: "bold",
									}}
									className="py-2 my-2 text-xl ">
									{column.render("Header")}
									<span>
										{column.isSorted
											? column.isSortedDesc
												? " 🔽"
												: " 🔼"
											: ""}
									</span>
								</th>
							))}
						</tr>
					))}
				</thead>
				<tbody {...getTableBodyProps()}>
					{rows.map((row) => {
						prepareRow(row);
						return (
							<tr {...row.getRowProps()}>
								{row.cells.map((cell) => {
									return (
										<td
											{...cell.getCellProps()}
											style={{
												padding: "10px",
												borderBottom: "solid 1px gray",
												background: "papayawhip",
											}}>
											{cell.render("Cell")}
										</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
}

export default Tasks;
