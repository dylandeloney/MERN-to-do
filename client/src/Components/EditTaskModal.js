import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ModalBody } from "reactstrap";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { editTask } from "../Actions/taskActions";
import { capitalizeFirstLetter } from "../helperFunctions";

function EditTaskModal() {
	let [disabled, setDisabled] = useState(true);
	const task = useSelector((state) => state.task.currentTask);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const editToggle = () => {
		setDisabled((disabled = !disabled));
	};

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			name: "",
			importance: "",
			deadline: "",
			lead: "",
			description: "",
			notes: "",
		},
	});

	useEffect(() => {
		if (task.length > 0) {
			let defaults = {
				name: task[0].name,
				importance: task[0].importance,
				deadline: task[0].deadline,
				lead: task[0].lead,
				description: task[0].description,
				notes: task[0].notes,
			};
			reset(defaults);
		}
	}, [task, reset]);

	const onSubmit = (e) => {
		const newTask = {
			_id: task[0]._id,
			name: capitalizeFirstLetter(e.name),
			importance: e.importance,
			deadline: e.deadline,
			lead: capitalizeFirstLetter(e.lead),
			description: e.description,
			notes: e.notes,
			creator_id: auth.user._id,
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
							<label htmlFor="name" className="formLabel">
								Task Name:
							</label>
							<input
								{...register("name")}
								type="text"
								className="formInput "
								name="name"
								placeholder="Enter the name of the task"
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
