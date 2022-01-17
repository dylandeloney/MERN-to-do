const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");

//User Model
const User = require("../../Models/User");

//@route Post API/users
//@desc Register user
//@access Public

router.post("/", (req, res) => {
	const { username, password, email } = req.body;

	//Validate all fields were filled out
	if (!username || !password || !email) {
		return res.status(400).json({ message: "Please enter all fields" });
	}

	//Check for existing user
	User.findOne({ email }).then((user) => {
		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const newUser = new User({
			username,
			password,
			email,
		});

		//Encrypt password
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
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
								},
							});
						}
					);
				});
			});
		});
	});
});

module.exports = router;
