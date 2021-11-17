import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../Actions/contactActions";
import { ModalBody, Modal, ModalHeader } from "reactstrap";

function NewContactForm() {
	let [visible, setVisible] = useState(false);

	const toggle = () => {
		setVisible((visible = !visible));
	};

	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);

	const onSubmit = (e) => {
		const newContact = {
			firstName: e.firstName,
			lastName: e.lastName,
			email: e.email,
			phoneNumber: e.phoneNumber,
			occupation: e.occupation,
			creator_id: auth.user._id,
		};

		dispatch(addContact(newContact));

		toggle();
	};

	return (
		<div>
			<button
				onClick={toggle}
				className="float-left bg-red-400 py-2 px-4 mx-2 my-2 rounded-md">
				New Contact
			</button>
			<Modal isOpen={visible} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					<h1 className="text-blue-400 text-5xl text-left mt-2">New Contact</h1>
				</ModalHeader>
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
								placeholder="Enter your contact's first name"
								required={true}
							/>
							{/* <span className="formError">A first name is required</span> */}
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
								placeholder="Enter your contact's last name"
								required={true}
							/>
							<span className="formError">A last name is required </span>
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
								placeholder="Enter your contact's email address"
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
								placeholder="Enter your contact's phone number"
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
								placeholder="Enter your contact's occupation"
								required={true}
							/>
						</div>

						<div className="formItem">
							<button
								className="formButton bg-green-400 py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
								type="submit">
								Create
							</button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default NewContactForm;
