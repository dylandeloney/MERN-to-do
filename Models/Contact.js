const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema
const ContactSchema = new Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	phoneNumber: {
		type: String,
	},
	occupation: {
		type: String,
	},
	lastContact: {
		type: Date,
	},
	creator_id: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
});

module.exports = Contact = mongoose.model("contact", ContactSchema);
