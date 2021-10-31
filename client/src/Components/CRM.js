import React, { useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { getContacts, deleteContact } from "../Actions/contactActions";
import NewContactForm from "./NewContactForm";

const dayjs = require("dayjs");

function CRM() {
	const dispatch = useDispatch();
	const contacts = useSelector((state) => state.contact.contacts);
	const auth = useSelector((state) => state.auth);

	useEffect(() => {
		if (auth.isAuthenticated === true) {
			dispatch(getContacts());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	const onDeleteClick = (id) => {
		setTimeout(() => {
			dispatch(deleteContact(id));
		}, 500);
	};

	return (
		<div>
			<NewContactForm />
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
						<tr key={contacts._id}>
							<td>{contacts.firstName + " " + contacts.lastName}</td>
							<td>{contacts.occupation}</td>
							<td>{contacts.phoneNumber}</td>
							<td>{contacts.email}</td>
							<td>{dayjs(contacts.lastContact).format("MM/DD/YYYY")}</td>
							<td className="inline-flex">
								<button
									//onClick={() => toggle(contacts._id)}
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
