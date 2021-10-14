import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ModalBody } from "reactstrap";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { editTask } from "../Actions/taskActions";

function EditTaskModal() {
	let [disabled, setDisabled] = useState(true);
	const task = useSelector((state) => state.task.currentTask);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const editToggle = () => {
		setDisabled((disabled = !disabled));
	};

	const { register, handleSubmit } = useForm();

	const onSubmit = (e) => {
		const newTask = {
			_id: task[0]._id,
			name: e.projectName,
			importance: e.importance,
			deadline: e.deadline,
			lead: e.lead,
			description: e.description,
			notes: e.notes,
			creator_id: auth.user.id,
		};

		dispatch(editTask(newTask._id, newTask));
	};

	return (
		<div>
			<div
				className="w-auto  px-2 border-solid border-b-2 pb-0"
				style={{ padding: "0px !important" }}>
				<h1 className=" justify-left text-blue-400 text-5xl text-left mt-2 inline-flex pr-36 ">
					Task Details
				</h1>
				<button
					onClick={() => editToggle()}
					className="jusity-right border-2 border-white bg-white rounded-md px-3  py-3 mt-0 inline-flex">
					<span>{disabled ? <FaLock /> : <FaLockOpen />}</span>
				</button>
			</div>
			{task.map((task) => (
				<ModalBody>
					<form
						key={task._id}
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
								defaultValue={task.name}
								disabled={disabled}
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
								defaultValue={task.importance}
								disabled={disabled}
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
								defaultValue={task.deadline}
								disabled={disabled}
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
								defaultValue={task.lead}
								disabled={disabled}
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
								placeholder="Enter a description of the task"
								defaultValue={task.description}
								disabled={disabled}></textarea>
						</div>

						<div className="formItem">
							<label htmlFor="notes" className="formLabel">
								Notes:
							</label>
							<textarea
								{...register("notes")}
								name="notes"
								className="formInput"
								placeholder="Enter any necessary notes related to the task"
								defaultValue={task.notes}
								disabled={disabled}></textarea>
						</div>

						<div className="formItem">
							{disabled ? null : (
								<button
									className="formButton bg-green-400 py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
									type="submit">
									{" "}
									Update
								</button>
							)}
						</div>
					</form>
				</ModalBody>
			))}
		</div>
	);
}

export default EditTaskModal;
