import "./App.css";
import "./styles.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import CRM from "./Components/CRM";
import Calendar from "./Components/Calendar.js";
import Tasks from "./Components/Tasks";
import { loadUser } from "./Actions/authActions";

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadUser());
	}, []);

	return (
		// <Provider store={store}>
		<div className="App">
			<BrowserRouter>
				<Navbar />
				<div className="container">
					{
						<Switch>
							<Route component={Home} path="/" exact />
							<Route component={CRM} path="/crm" />
							<Route component={Calendar} path="/calendar" />
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
