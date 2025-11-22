const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Serve static files (HTML, CSS, JS)
app.use(express.static(__dirname));

app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://bhanubasyan_db_user:WPaaS7gKwpyuxqgB@cluster1.rwapb1j.mongodb.net/registration_db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected!"))
  .catch(err => console.log(err));

// User Schema (collection = users)
const userSchema = new mongoose.Schema(
  {
    fullname: String,
    email: String,
    phone: String,
    password: String,
  },
  { collection: "users" }
);

const User = mongoose.model("User", userSchema);

// 👉 Registration Page  
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/registration.html");
});

// 👉 REGISTER API (you forgot this!)
app.post("/register", async (req, res) => {
  try {
    const { fullname, email, phone, password } = req.body;

    const newUser = new User({ fullname, email, phone, password });
    await newUser.save();

    res.send("User Registered Successfully!");
  } catch (err) {
    console.log(err);
    res.status(500).send("Error registering user");
  }
});

// 👉 Show All Users
app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).send("Error fetching users");
  }
});

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
