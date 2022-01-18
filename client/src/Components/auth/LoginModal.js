import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { ModalBody, Modal, ModalHeader, ModalFooter, Alert } from "reactstrap";
import { clearErrors } from "../../Actions/errorActions";
import { loginUser } from "../../Actions/authActions";
import RegisterModal from "./RegisterModal";

function LoginModal() {
	const { register, handleSubmit } = useForm();
	const dispatch = useDispatch();

	//Create functionality to toggle both modals
	let [visible, setVisible] = useState(false);

	const toggle = () => {
		dispatch(clearErrors());
		setVisible((visible = !visible));
	};

	//Handle submission of login form
	const onLoginSubmit = (e) => {
		const user = {
			email: e.email,
			password: e.password,
		};

		dispatch(loginUser(user));
	};

	//show error message
	const error = useSelector((state) => state.error);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (visible === true) {
			if (auth.isAuthenticated === true) {
				toggle();
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, auth, visible]);

	return (
		//Create Login Modal form
		<div>
			<button
				onClick={toggle}
				className="inline-flex items-center py-3 px-3 my-3 rounded text-blue-200 text-xl hover:text-green-800">
				Login
			</button>
			<Modal isOpen={visible} toggle={toggle}>
				<ModalHeader toggle={toggle}>
					<h1 className="text-blue-400 text-3xl text-left mt-2">
						Log in to your account
					</h1>
				</ModalHeader>
				<ModalBody>
					{error.msg.message ? (
						<Alert color="danger">{error.msg.message}</Alert>
					) : null}
					<form
						className="bg-white rounded-lg"
						method="post"
						onSubmit={handleSubmit(onLoginSubmit)}>
						<div className="formItem">
							<label htmlFor="email" className="formLabel">
								Email:
							</label>
							<input
								{...register("email")}
								required="true"
								type="email"
								className="formInput "
								name="email"
								placeholder=" Please enter your email"
							/>
						</div>

						<div className="formItem">
							<label htmlFor="password" className="formLabel">
								Password:
							</label>
							<input
								{...register("password")}
								required="true"
								type="password"
								className="formInput "
								name="password"
								placeholder=" Please enter your password"
							/>
						</div>
						<ModalFooter>
							{/* import nested modal (register modal) */}
							<RegisterModal />
							<div className="formItem">
								<button
									className="formButton bg-green-400 py-4 px-8 my-4 rounded-md text-white text-8 font-semibold cursor-pointer"
									type="submit">
									Login
								</button>
							</div>
						</ModalFooter>
					</form>
				</ModalBody>
			</Modal>
		</div>
	);
}

export default LoginModal;
