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
		<form onSubmit={handleSubmit(onSubmit)}>
			<input {...register("keyword")} />
			{toggle ? (
				<button type="submit">Clear</button>
			) : (
				<button type="submit">Search</button>
			)}
		</form>
	);
}

export default CRMSearchBar;
