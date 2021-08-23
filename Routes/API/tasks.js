const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");

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
//@access Private

router.post("/", auth, (req, res) => {
	const newTask = new Task({
		name: req.body.name,
		importance: req.body.importance,
		deadline: req.body.deadline,
		lead: req.body.lead,
		description: req.body.description,
		notes: req.body.notes,
	});
	console.log(newTask);
	newTask.save().then((task) => res.json(task));
});

//@route Delete API/tasks/:id
//@desc Delete a task
//@access  private

router.delete("/:id", auth, (req, res) => {
	Task.findById(req.params.id)
		.then((task) => task.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ sucess: false }));
});

module.exports = router;
