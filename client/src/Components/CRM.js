import React from "react";
import NewContactForm from "./NewContactForm";
import CRMSearchBar from "./CRMSearchBar";
import CRMTable from "./CRMTable";

function CRM() {
	return (
		<div>
			<NewContactForm />
			<CRMSearchBar />
			<CRMTable />
		</div>
	);
}

export default CRM;
