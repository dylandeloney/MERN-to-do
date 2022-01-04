import "./App.css";
import "./styles.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import CRM from "./Components/CRM";
import TaskCalendar from "./Components/TaskCalendar.js";
import Tasks from "./Components/Tasks";
import { loadUser } from "./Actions/authActions";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		// <Provider store={store}>
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					{
						<Switch>
							<Route component={CRM} path="/crm" />
							<Route component={TaskCalendar} path="/calendar" />
							<Route component={Tasks} path="/tasks" />
						</Switch>
					}
				</div>
			</BrowserRouter>
		</div>
		// </Provider>
	);
}

export default App;
