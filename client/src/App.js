import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import CRM from "./Components/CRM";
import Calendar from "./Components/Calendar.js";
import Tasks from "./Components/Tasks";

function App() {
	return (
		<div className="App container">
			<BrowserRouter>
				<Navbar />
				{
					<Switch>
						<Route component={Home} path="/" exact />
						<Route component={CRM} path="/crm" />
						<Route component={Calendar} path="/calendar" />
						<Route component={Tasks} path="/tasks" />
					</Switch>
				}
			</BrowserRouter>
		</div>
	);
}

export default App;
