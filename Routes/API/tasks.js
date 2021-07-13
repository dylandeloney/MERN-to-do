const express = require("express");
const router = express.Router();

//Task Model
const Task = require("../../Models/Task");

//@route GET API/tasks
//@desc Get All Items
//@access Public

router.get("/", (req, res) => {
	Task.find()
		.sort({ date: -1 })
		.then((tasks) => res.json(tasks));
});

//@route POST API/tasks
//@desc Post a new task
//@access Public

router.post("/", (req, res) => {
	const newTask = new Task({
		name: req.body.name,
		importance: req.body.importance,
		deadline: req.body.deadline,
		lead: req.body.lead,
		description: req.body.description,
		notes: req.body.notes,
	});

	newTask.save().then((task) => res.json(task));
});

//@route Delete API/tasks/:id
//@desc Delete a task
//@access Public

router.delete("/:id", (req, res) => {
	Task.findById(req.params.id)
		.then((task) => task.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ sucess: false }));
});

module.exports = router;
