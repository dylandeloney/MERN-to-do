const express = require("express");
const router = express.Router();
var mongoose = require("mongoose");
const auth = require("../../Middleware/auth");

//Contect Model
const Contact = require("../../Models/Contact");

//{ creator_id: objectID }:userid
router.get("/", (req, res) => {
	const objectID = mongoose.Types.ObjectId(req.params.userid);
	Contact.find()
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

module.exports = router;
