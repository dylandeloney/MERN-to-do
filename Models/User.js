const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
	username: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	register_date: {
		type: Date,
		default: Date.now,
	},
	tasklist: [
		{
			type: Schema.Types.ObjectId,
			ref: "Task",
		},
	],
});

module.exports = User = mongoose.model("user", UserSchema);
