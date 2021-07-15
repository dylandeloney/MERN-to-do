import "./App.css";
import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import CRM from "./Components/CRM";
import Calendar from "./Components/Calendar.js";
import Tasks from "./Components/Tasks";
import CreateTaskForm from "./Components/CreateTaskForm";

function App() {
	return (
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
							<Route component={CreateTaskForm} path="/create" />
						</Switch>
					}
				</div>
			</BrowserRouter>
		</div>
	);
}

export default App;
