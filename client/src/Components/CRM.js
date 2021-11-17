import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { Modal } from "reactstrap";
import {
	getContacts,
	deleteContact,
	getSingleContact,
	clearCurrentContact,
	clearContacts,
	unselectContact,
	selectContact,
} from "../Actions/contactActions";
import NewContactForm from "./NewContactForm";
import EditContactForm from "./EditContactForm";
import CRMSearchBar from "./CRMSearchBar";

const dayjs = require("dayjs");

function CRM() {
	const dispatch = useDispatch();
	const contacts = useSelector((state) => state.contact.contacts);

	const auth = useSelector((state) => state.auth);
	let [visible, setVisible] = useState(false);

	useEffect(() => {
		if (
			(auth.isAuthenticated === true && auth.user._id != null) ||
			(visible && auth.user._id != null)
		) {
			dispatch(getContacts(auth.user._id));
		} else {
			dispatch(clearContacts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);
	const searchedContacts = useSelector((state) =>
		state.contact.selectedContacts.map((contact) => contact._id)
	);

	//delete button click event
	const onDeleteClick = (id) => {
		setTimeout(() => {
			dispatch(deleteContact(id));
		}, 500);
	};

	//toggle editContactForm Modal
	const toggle = (id) => {
		setVisible((visible = !visible));
		if (visible === true) {
			dispatch(getSingleContact(id));
		} else {
			dispatch(clearCurrentContact());
		}
	};

	const changeColor = (id) => {
		if (searchedContacts.includes(id)) {
			dispatch(unselectContact(id));
		} else {
			dispatch(selectContact(id));
		}
	};

	return (
		<div>
			<NewContactForm />
			<CRMSearchBar />
			<table className="w-full  m-auto">
				<thead>
					<tr className="bg-gray-500 py-2 my-2 text-xl">
						<td>Name</td>
						<td>Occupation</td>
						<td>Phone Number</td>
						<td>Email</td>
						<td>Last Connection</td>
						<td>Options</td>
					</tr>
				</thead>
				<tbody>
					{contacts.map((contacts) => (
						<tr
							key={contacts._id}
							style={{
								color: searchedContacts.includes(contacts._id) ? "blue" : "",
							}}
							onClick={() => changeColor(contacts._id)}
							className="hover:bg-blue-200">
							<td>{contacts.firstName + " " + contacts.lastName}</td>
							<td>{contacts.occupation}</td>
							<td>{contacts.phoneNumber}</td>
							<td>{contacts.email}</td>
							<td>{dayjs(contacts.lastContact).format("MM/DD/YYYY")}</td>
							<td className="inline-flex">
								<Modal isOpen={visible} toggle={toggle} className="p-0">
									<EditContactForm />
								</Modal>
								<button
									onClick={() => toggle(contacts._id)}
									className=" border-2 border-gray-600 text-gray-600 bg-white rounded-md justify-left px-2 py-2 my-2 mr-1">
									<span>
										<FaEdit />
									</span>
								</button>
								<button
									onClick={() => onDeleteClick(contacts._id)}
									className="jusity-right border-2 text-red-400 border-red-400 bg-white  rounded-md px-2 ml-1 py-2 my-2">
									<span>
										<FaTrash />
									</span>
								</button>{" "}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default CRM;
