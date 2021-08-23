import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
	ModalBody,
	Modal,
	ModalHeader,
	ModalFooter,
	Button,
	Alert,
} from "reactstrap";
import { registerUser } from "../../Actions/authActions";
import { clearErrors } from "../../Actions/errorActions";

function RegisterModal() {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();

	//Create functionality to toggle both modals
	let [visible, setVisible] = useState(false);
	let [nestedVisible, setNestedVisible] = useState(false);
	let [closeAll, setCloseAll] = useState(false);

	const toggle = () => {
		dispatch(clearErrors());
		setVisible((visible = !visible));
	};

	const toggleNested = () => {
		dispatch(clearErrors());
		setNestedVisible(!nestedVisible);
		setCloseAll(false);
	};

	const toggleAll = () => {
		dispatch(clearErrors());
		setNestedVisible(!nestedVisible);
		setCloseAll(true);
	};

	//Handle submission of register form
	const onRegisterSubmit = (e) => {
		const newUser = {
			username: e.registerUsername,
			password: e.registerPassword,
			email: e.registerEmail,
		};
		dispatch(registerUser(newUser));
	};

	//show error message
	const error = useSelector((state) => state.error);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (nestedVisible === true) {
			if (auth.isAuthenticated === true) {
				toggleAll();
			}
		}
	}, [error, auth]);

	return (
		<div>
			<div className="formItem">
				<Button
					color="primary"
					className="py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
					onClick={toggleNested}>
					Register
				</Button>
			</div>
			<Modal
				isOpen={nestedVisible}
				toggle={toggleNested}
				onClosed={closeAll ? toggle : undefined}>
				<ModalHeader>
					<h1 className="text-blue-400 text-3xl text-left mt-2">
						Register a new account
					</h1>
				</ModalHeader>
				<form
					className="bg-white rounded-lg"
					method="post"
					onSubmit={handleSubmit(onRegisterSubmit)}>
					<ModalBody>
						{error.msg.message ? (
							<Alert color="danger">{error.msg.message}</Alert>
						) : null}
						<div className="formItem">
							<label htmlFor="registerUsername" className="formLabel">
								Name:
							</label>
							<input
								{...register("registerUsername")}
								type="text"
								className="formInput "
								name="registerUsername"
								placeholder="Please enter your name"
							/>
							<span className="formError">A name is required</span>
						</div>

						<div className="formItem">
							<label htmlFor="registerEmail" className="formLabel">
								Email:
							</label>
							<input
								{...register("registerEmail")}
								type="text"
								className="formInput "
								name="registerEmail"
								placeholder="Please enter your email"
							/>
							<span className="formError">
								A valid email address is required
							</span>
						</div>

						<div className="formItem">
							<label htmlFor="registerPassword" className="formLabel">
								Password:
							</label>
							<input
								{...register("registerPassword")}
								type="text"
								className="formInput "
								name="registerPassword"
								placeholder="Please enter your password"
							/>
							<span className="formError">A password is required</span>
						</div>
					</ModalBody>
					<ModalFooter>
						<Button
							color="danger"
							onClick={toggleNested}
							className="formButton py-4 my-4 rounded-md text-white text-8 font-semibold cursor-pointer">
							Cancel
						</Button>
						<Button
							type="submit"
							color="primary"
							className="formButton py-4  my-4 rounded-md text-white text-8 font-semibold cursor-pointer">
							Register
						</Button>
					</ModalFooter>
				</form>
			</Modal>
		</div>
	);
}

export default RegisterModal;
