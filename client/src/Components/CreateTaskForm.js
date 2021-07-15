import React from "react";
import { Link } from "react-router-dom";
function CreateTaskForm() {
	return (
		<div>
			<div className="container">
				<h1 className="text-blue-400 text-5xl text-left mt-2">
					Create a New Task
				</h1>
				<form className="bg-white rounded-lg mt-5" method="post">
					<div className="formItem">
						<label htmlFor="projectName" className="formLabel">
							Task Name:
						</label>
						<input
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
							min="1"
							max="10"
							type="number"
							className="formInput  formInputSmall"
							name="importance"
							placeholder="Enter the importance rating (1 - 10)"
						/>
						<span className="formError">An importance rating is required</span>
					</div>

					<div className="formItem">
						<label htmlFor="deadline" className="formLabel">
							Deadline:
						</label>
						<input
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
							type="text"
							className="formInput "
							name="lead"
							placeholder="Enter the name of the leader for this task"
						/>
						<span className="formError">A leader for the task is required</span>
					</div>

					<div className="formItem">
						<label htmlFor="description" className="formLabel">
							Description:
						</label>
						<textarea
							name="description"
							className="formInput"
							placeholder="Enter a description of the task"></textarea>
					</div>

					<div className="formItem">
						<label htmlFor="notes" className="formLabel">
							Notes:
						</label>
						<textarea
							name="notes"
							className="formInput"
							placeholder="Enter any necessary notes related to the task"></textarea>
					</div>

					<div className="formItem">
						<Link to="/tasks">
							<button
								className="formButton bg-green-400 py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
								type="submit">
								Create
							</button>
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default CreateTaskForm;
