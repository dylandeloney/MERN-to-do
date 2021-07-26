const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TaskSchema = new Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	importance: {
		type: Number,
		required: true,
	},
	deadline: {
		type: Date,
		required: true,
		default: Date.now(),
	},
	lead: {
		type: String,
	},
	description: {
		type: String,
	},
	notes: {
		type: String,
	},
	createdTime: {
		type: Date,
		default: Date.now(),
	},
});

module.exports = Task = mongoose.model("task", TaskSchema);
