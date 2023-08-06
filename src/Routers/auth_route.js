const express = require('express');
const router = express.Router();
const bcryptjs = require('bcryptjs');
const User = require("../Models/auth_model");
const jwt = require('jsonwebtoken');
const auth = require("../Middleware/auth_middleware");

// User Sign Up Post API:
router.post("/notes/signup", async (req, res) => {

    try {
        // Get name, email and password from request:
        const { name, email, password } = req.body;

        // Check for existing user:
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User Already Exists" });
        }

        // If user not exists then hash the password:
        const hashedPass = await bcryptjs.hash(password, 8); // 8: salt

        // Assign the data to the Model:
        let user = new User({
            name: name,
            email: email,
            password: hashedPass
        });

        // Save user data to Mongodb:
        saveUser = await user.save();

        res.status(200).json(user);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// User Sign In Post API:
router.post("/notes/signin", async (req, res) => {
    try {

        // Get data like email and passwod:
        const { email, password } = req.body;

        // Find if the user does not exists:
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User with this email does not exists' });
        }

        // Check if the password match with the user's password:
        const isMatch = await bcryptjs.compare(password, user.password);

        // Check if the password does not match then return msg:
        if (!isMatch) {
            return res.status(400).json({ msg: 'Incorrect Password' });
        }

        // Create token to store in Shared_Preferences:
        const token = jwt.sign({ id: user._id }, "passwordKey");

        // ...user._doc will get only relevant data like (_id,name,email,password etc):
        res.json({ token, ...user._doc });

    } catch (err) {
        res.status(400).send(err.message);
    }
});

// Token Validation:
router.post("/tokenIsValid", async (req, res) => {
    try {
        const token = req.header('x-auth-token');
        if (!token) return res.json(false);

        const verified = jwt.verify(token, "passwordKey");
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        res.json(true);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Not to Login User everytime:
router.get("/", auth, async () => {
    const user = await User.findById(req.body);
    res.json({ ...user._doc, token: req.token });
});

module.exports = router;