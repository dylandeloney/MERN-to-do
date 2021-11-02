const express = require("express");
const router = express.Router();
const auth = require("../../Middleware/auth");
var mongoose = require("mongoose");

//Task Model
const Task = require("../../Models/Task");

//@route GET API/tasks
//@desc Get All tasks by logged in user
//@access Public

router.get("/:userid", (req, res) => {
	let objectID = mongoose.Types.ObjectId(req.params.userid);
	Task.find({ creator_id: objectID })
		.sort({ deadline: 1 })
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
		creator_id: req.body.creator_id,
	});
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

//@route Delete API/tasks/:id
//@desc Delete a task
//@access  private

router.get("/view/:id", (req, res) => {
	Task.findById(req.params.id).then((tasks) => res.json(tasks));
});

router.post("/view/:id", (req, res) => {
	Task.findByIdAndUpdate(
		req.body._id,
		{
			_id: req.body._id,
			name: req.body.name,
			importance: req.body.importance,
			deadline: req.body.deadline,
			lead: req.body.lead,
			description: req.body.description,
			notes: req.body.notes,
			creator_id: req.body.creator_id,
		},
		{ new: true, useFindAndModify: false }
	)
		.then((task) => res.json(task))
		.catch((err) => res.status(500).json({ success: false }));
});

module.exports = router;
