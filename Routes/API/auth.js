const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const auth = require("../../Middleware/auth");

//User Model
const User = require("../../Models/User");

//@route Post API/auth
//@desc Auth user
//@access Public

router.post("/", (req, res) => {
	const { password, email } = req.body;

	//Validate all fields were filled out
	if (!password || !email) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	//Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ message: "User does not exist" });

		//Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch)
				return res.status(400).json({ message: "Invalid credentials" });

			jwt.sign(
				{
					id: user.id,
				},
				config.get("jwtSecret"),
				{ expiresIn: 3600 },
				(err, token) => {
					if (err) throw err;
					res.json({
						token,
						user: {
							_id: user.id,
							username: user.username,
							email: user.email,
							tasklist: user.tasklist,
						},
					});
				}
			);
		});
	});
});

//@route Get API/auth/user
//@desc Get user data
//@access Private

router.get("/user", auth, (req, res) => {
	User.findById(req.user.id)
		.select("-password")
		.then((user) => res.json(user));
});

module.exports = router;
