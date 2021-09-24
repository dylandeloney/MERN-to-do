const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const TaskSchema = new Schema({
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
	creator_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = Task = mongoose.model("task", TaskSchema);
