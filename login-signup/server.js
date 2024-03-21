// // server.js

// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");

// const app = express();
// const PORT = process.env.PORT || 3000;

// // MongoDB setup
// mongoose.connect("mongodb://localhost:27017/login-signup", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// const User = mongoose.model("User", { email: String, password: String });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Routes
// app.post("/signup", async (req, res) => {
//   try {
//     const hashedPassword = await bcrypt.hash(req.body.password, 10);
//     const user = new User({ email: req.body.email, password: hashedPassword });
//     await user.save();
//     res.status(201).send("User created successfully");
//   } catch (error) {
//     res.status(500).send("Error signing up");
//   }
// });

// app.post("/login", async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) {
//     return res.status(404).send("User not found");
//   }

//   const validPassword = await bcrypt.compare(req.body.password, user.password);
//   if (!validPassword) {
//     return res.status(401).send("Invalid password");
//   }

//   res.status(200).send("Login successful");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
// server.js

const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB setup
mongoose.connect('mongodb://localhost:27017/login-signup', { useNewUrlParser: true, useUnifiedTopology: true });
const User = mongoose.model('User', { email: String, password: String });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the current directory
app.use(express.static(__dirname));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'signup.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

app.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = new User({ email: req.body.email, password: hashedPassword });
        await user.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        res.status(500).send("Error signing up");
    }
});

app.post('/login', async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(404).send("User not found");
    }

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(401).send("Invalid password");
    }

    res.status(200).send("Login successful");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
