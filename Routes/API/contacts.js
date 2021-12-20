const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const auth = require("../../Middleware/auth");

//Contect Model
const Contact = require("../../Models/Contact");

router.get("/:userid", (req, res) => {
	const objectID = mongoose.Types.ObjectId(req.params.userid);
	Contact.find({ creator_id: objectID })
		.sort({ lastName: 1 })
		.then((contacts) => res.json(contacts));
});

//@route POST API/tasks
//@desc Post a new task
//@access Private auth

router.post("/", (req, res) => {
	const newContact = new Contact({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		lastContact: req.body.lastContact,
		occupation: req.body.occupation,
		lower_occupation: req.body.lower_occupation,
		creator_id: req.body.creator_id,
	});
	newContact.save().then((contact) => res.json(contact));
});

//@route Delete API/tasks/:id
//@desc Delete a task
//@access  private auth

router.delete("/:id", (req, res) => {
	Contact.findById(req.params.id)
		.then((contact) => contact.remove().then(() => res.json({ success: true })))
		.catch((err) => res.status(404).json({ sucess: false }));
});

router.get("/view/:id", (req, res) => {
	Contact.findById(req.params.id).then((contact) => res.json(contact));
});

router.post("/view/:id", (req, res) => {
	Contact.findByIdAndUpdate(
		req.body._id,
		{
			_id: req.body._id,
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			phoneNumber: req.body.phoneNumber,
			lastContact: req.body.lastContact,
			occupation: req.body.occupation,
			creator_id: req.body.creator_id,
		},
		{ new: true, useFindAndModify: false }
	)
		.then((contact) => res.json(contact))
		.catch((err) => res.status(500).json({ success: false }));
});

router.get("/:userid/:lower_occupation", (req, res) => {
	const objectID = mongoose.Types.ObjectId(req.params.userid);
	Contact.find({
		creator_id: objectID,
		lower_occupation: req.params.lower_occupation,
	}).then((contacts) => res.json(contacts));
});

module.exports = router;
