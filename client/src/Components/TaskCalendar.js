import React, { useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useSelector, useDispatch } from "react-redux";
import { getTasks, clearTasks } from "../Actions/taskActions";

const locales = {
	"en-US": enUS,
};

const localizer = dateFnsLocalizer({
	format,
	parse,
	startOfWeek,
	getDay,
	locales,
});

function TaskCalendar() {
	const dispatch = useDispatch();
	const task = useSelector((state) => state.task.tasks);
	const auth = useSelector((state) => state.auth);

	//get tasks from state
	useEffect(() => {
		if (auth.isAuthenticated === true) {
			dispatch(getTasks(auth.user.id));
		} else {
			dispatch(clearTasks());
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [auth]);

	const getTaskList = () => {
		let myEventsList = [];
		task.map((task) => {
			const deadline = new Date(task.deadline);
			deadline.setDate(deadline.getDate() + 1);
			const newEvent = {
				title: task.name,
				start: deadline,
				end: deadline,
			};
			myEventsList.push(newEvent);
			return myEventsList;
		});
		return myEventsList;
	};

	console.log(getTaskList());
	return (
		<div>
			<Calendar
				localizer={localizer}
				events={getTaskList()}
				startAccessor="start"
				endAccessor="end"
				style={{ height: 500 }}
				className="mt-4"
			/>
		</div>
	);
}

export default TaskCalendar;
