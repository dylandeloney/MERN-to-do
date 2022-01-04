import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	searchContactsByOccupation,
	getContacts,
} from "../Actions/contactActions";

function CRMSearchBar() {
	const { register, reset, handleSubmit } = useForm({
		defaultValues: { keyword: "" },
	});
	const auth = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const [toggle, setToggle] = useState(false);

	useEffect(() => {
		if (toggle === false) {
			reset({
				keyword: "",
			});
		}
	}, [toggle, reset]);

	const onSubmit = (e) => {
		const id = auth.user._id;

		if (toggle === false) {
			const keyword = e.keyword.toLowerCase();
			dispatch(searchContactsByOccupation(id, keyword));
		} else {
			dispatch(getContacts(id));
		}

		setToggle((toggle) => !toggle);
	};

	return (
		<form
			style={{
				display: auth.isAuthenticated === false ? "none" : "",
			}}
			onSubmit={handleSubmit(onSubmit)}
			className="float-right   mx-2 my-2 rounded-md">
			<input
				{...register("keyword")}
				className="border-2 rounded-md p-2 hover:border-blue-200"
				placeholder="Search by occupation"
			/>
			<button type="submit" className="border-2 rounded-md p-2 ml-1">
				{toggle ? "Clear" : "Search"}
			</button>
		</form>
	);
}

export default CRMSearchBar;
