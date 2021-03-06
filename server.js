const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const path = require("path");

const app = express();

// bodyParser Middleware
app.use(express.json());

// DB config
const db = config.get("mongoURI");

//Connect Database
mongoose
	.connect(db, {
		useCreateIndex: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("MongoDB connected..."))
	.catch((err) => console.log(err));

// Use Routes
app.use("/API/tasks", require("./Routes/API/tasks"));
app.use("/API/users", require("./Routes/API/users"));
app.use("/API/auth", require("./Routes/API/auth"));
app.use("/API/contacts", require("./Routes/API/contacts"));

//Serve static assets if in production
if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
