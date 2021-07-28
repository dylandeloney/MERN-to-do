import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { addTask } from "../Actions/taskActions";
import { ModalBody, Modal, ModalHeader } from "reactstrap";
import { v4 as uuid } from "uuid";

function CreateTaskForm() {
	let [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible((visible = !visible));
	};

	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();

	const onSubmit = (e) => {
		const newTask = {
			id: uuid(),
			projectName: e.projectName,
			importance: e.importance,
			deadline: e.deadline,
			lead: e.lead,
			description: e.description,
			notes: e.notes,
		};

		dispatch(addTask(newTask));

		toggle();
	};

	return (
		<div>
			<button
				onClick={toggle}
				className="float-left bg-red-400 py-2 px-4 mx-2 my-2 rounded-md">
				Create Task
			</button>
			<Modal isOpen={visible} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					<h1 className="text-blue-400 text-5xl text-left mt-2">
						Create a New Task
					</h1>
				</ModalHeader>
				<ModalBody>
					<form
						className="bg-white rounded-lg"
						method="post"
						onSubmit={handleSubmit(onSubmit)}>
						<div className="formItem">
							<label htmlFor="projectName" className="formLabel">
								Task Name:
							</label>
							<input
								{...register("projectName")}
								type="text"
								className="formInput "
								name="projectName"
								placeholder="Enter the name of the task"
							/>
							<span className="formError">A task name is required</span>
						</div>

						<div className="formItem">
							<label htmlFor="importance" className="formLabel">
								Importance:
							</label>
							<input
								{...register("importance")}
								min="1"
								max="10"
								type="number"
								className="formInput  formInputSmall"
								name="importance"
								placeholder="Enter the importance rating (1 - 10)"
							/>
							<span className="formError">
								An importance rating is required
							</span>
						</div>

						<div className="formItem">
							<label htmlFor="deadline" className="formLabel">
								Deadline:
							</label>
							<input
								{...register("deadline")}
								type="date"
								className="formInput  formInputSmall"
								name="deadline"
								placeholder="Enter a deadline for the task"
							/>
							<span className="formError">A deadline is required</span>
						</div>

						<div className="formItem">
							<label htmlFor="lead" className="formLabel">
								Leader:
							</label>
							<input
								{...register("lead")}
								type="text"
								className="formInput "
								name="lead"
								placeholder="Enter the name of the leader for this task"
							/>
							<span className="formError">
								A leader for the task is required
							</span>
						</div>

						<div className="formItem">
							<label htmlFor="description" className="formLabel">
								Description:
							</label>
							<textarea
								{...register("description")}
								name="description"
								className="formInput"
								placeholder="Enter a description of the task"></textarea>
						</div>

						<div className="formItem">
							<label htmlFor="notes" className="formLabel">
								Notes:
							</label>
							<textarea
								{...register("notes")}
								name="notes"
								className="formInput"
								placeholder="Enter any necessary notes related to the task"></textarea>
						</div>

						<div className="formItem">
							{/* <Link to="/tasks"> */}
							<button
								className="formButton bg-green-400 py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
								type="submit">
								Create
							</button>
							{/* </Link> */}
						</div>
					</form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default CreateTaskForm;
