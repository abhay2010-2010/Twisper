const generateTokenandSetCookies = require("../lib/generatToken");
// ✅ Fixed incorrect import
const bcrypt = require("bcryptjs");
const User = require("../schema/User.modal");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    try {
        const { fullName, email, username, password } = req.body;

        // ✅ Check if all fields are provided
        if (!fullName || !email || !username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        // ✅ Email Validation using Regex
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ error: "Invalid email address" });
        }
        console.log("xxxxx")
        // ✅ Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ error: "Email already exists" });
        }

        // ✅ Hash password securely
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ✅ Create new user
        const newUser = new User({
            fullName,
            email,
            username,
            password: hashedPassword,
        });

        // ✅ Save user to database
        await newUser.save();

        // ✅ Generate JWT token and set cookies
        await generateTokenandSetCookies(newUser._id, res);

        // ✅ Return user data (excluding password)
        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            email: newUser.email,
            password: newUser.password,
            username: newUser.username,
            followers: newUser.followers || [],
            followings: newUser.followings || [],
            profileImage: newUser.profileImage || "",
            coverImage: newUser.coverImage || "",
            message: "User registered successfully!",
        });

    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // ✅ Validate input fields
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        // ✅ Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid username" });
        }

        // ✅ Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // ✅ Generate JWT token and set cookie
        await generateTokenandSetCookies(user._id, res);

        // ✅ Send success response
        res.status(200).json({
            message: "Login successful",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                password: user.password,
                username: user.username,
                followers: user.followers,
                followings: user.followings,
                profileImage: user.profileImage,
                coverImage: user.coverImage,
            },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const logout = async (req, res) => {
    try {
        // ✅ Correctly remove the JWT cookie
        res.cookie("jwt", "", {
            httpOnly: true,
            expires: new Date(0), // ✅ Expire immediately
            secure: process.env.NODE_ENV !== "development", // ✅ Secure in production
            sameSite: "strict",
        });

        res.status(200).json({ message: "Logged out successfully" });
    } catch (err) {
        console.error("Logout Error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const getme = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Get Me Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

module.exports = { signup, login, logout, getme };
