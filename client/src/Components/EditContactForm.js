import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { ModalBody } from "reactstrap";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { editContact } from "../Actions/contactActions";

function EditContactForm() {
	let [disabled, setDisabled] = useState(true);
	const contact = useSelector((state) => state.contact.currentContact);
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const editToggle = () => {
		setDisabled((disabled = !disabled));
	};

	const { register, handleSubmit, reset } = useForm({
		defaultValues: {
			firstName: "",
			lastName: "",
			email: "",
			phoneNumber: "",
			occupation: "",
		},
	});

	useEffect(() => {
		if (contact.length > 0) {
			let defaults = {
				firstName: contact[0].firstName,
				lastName: contact[0].lastName,
				email: contact[0].email,
				phoneNumber: contact[0].phoneNumber,
				occupation: contact[0].occupation,
			};
			reset(defaults);
		}
	}, [contact, reset]);

	const onSubmit = (e) => {
		const newContact = {
			_id: contact[0]._id,
			firstName: e.firstName,
			lastName: e.lastName,
			email: e.email,
			phoneNumber: e.phoneNumber,
			occupation: e.occupation,
			creator_id: auth.user._id,
		};

		dispatch(editContact(newContact._id, newContact));
	};

	return (
		<div>
			<div
				className="w-auto  px-2 border-solid border-b-2 pb-0"
				style={{ padding: "0px !important" }}>
				<h1 className=" justify-left text-blue-400 text-5xl text-left mt-2 inline-flex pr-24">
					Contact Details
				</h1>
				<button
					onClick={() => editToggle()}
					className="jusity-right border-2 border-white bg-white rounded-md px-3  py-3 mt-0 inline-flex">
					<span>{disabled ? <FaLock /> : <FaLockOpen />}</span>
				</button>
			</div>
			{contact.map((contact) => (
				<ModalBody>
					<form
						className="bg-white rounded-lg"
						method="post"
						onSubmit={handleSubmit(onSubmit)}>
						<div className="formItem">
							<label htmlFor="firstName" className="formLabel">
								First Name:
							</label>
							<input
								{...register("firstName")}
								type="text"
								className="formInput formInputSmall"
								name="firstName"
								required={true}
								disabled={disabled}
							/>
						</div>

						<div className="formItem">
							<label htmlFor="lastName" className="formLabel">
								Last Name:
							</label>
							<input
								{...register("lastName")}
								min="1"
								max="10"
								type="text"
								className="formInput  formInputSmall"
								name="lastName"
								required={true}
								disabled={disabled}
							/>
						</div>

						<div className="formItem">
							<label htmlFor="email" className="formLabel">
								Email Address:
							</label>
							<input
								{...register("email")}
								type="text"
								className="formInput "
								name="email"
								disabled={disabled}
							/>
						</div>

						<div className="formItem">
							<label htmlFor="phoneNumber" className="formLabel">
								Phone Number:
							</label>
							<input
								{...register("phoneNumber")}
								type="text"
								className="formInput "
								name="phoneNumber"
								disabled={disabled}
							/>
						</div>
						<div className="formItem">
							<label htmlFor="occupation" className="formLabel">
								Occupation:
							</label>
							<input
								{...register("occupation")}
								type="text"
								className="formInput "
								name="occupation"
								required={true}
								disabled={disabled}
							/>
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

export default EditContactForm;
