import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { searchContactsByOccupation } from "../Actions/contactActions";

function CRMSearchBar() {
	const dispatch = useDispatch();
	const { register, handleSubmit } = useForm();
	const auth = useSelector((state) => state.auth);

	//create suggestion list. TBD IF NEEDED
	// let suggestions = contacts.map((contact) => ({
	// 	_id: contact._id,
	// 	occuption: contact.occupation,
	// 	name: contact.firstName + " " + contact.lastName,
	// }));

	//Search function
	const onSearch = (e) => {
		const id = auth.user._id;
		const keyword = e.keyword;
		dispatch(searchContactsByOccupation(id, keyword));
	};

	return (
		<div
			style={{
				display: auth.isAuthenticated === false ? "none" : "",
			}}>
			<form className="bg-white rounded-lg" onSubmit={handleSubmit(onSearch)}>
				{" "}
				<div className="formItem">
					<label htmlFor="search" className="formLabel">
						Search
					</label>
					<input
						{...register("keyword")}
						type="text"
						className="formInput "
						name="keyword"
						placeholder="Search by occupation"
					/>
				</div>
				<div className="formItem">
					<button
						className="formButton bg-gray-200 p-2 rounded-md text-white text-8 font-semibold cursor-pointer"
						type="submit">
						X
					</button>
				</div>
			</form>
		</div>
	);
}

export default CRMSearchBar;
