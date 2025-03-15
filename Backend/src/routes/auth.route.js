const express = require("express");
const { signup, login, logout, getme } = require("../controllers/auth.controller");
const proctedRoute = require("../middleware/Proctedroute");

const authRoute = express.Router();

authRoute.get("/me",proctedRoute,getme)

authRoute.post("/signup", signup);
authRoute.post("/login", login)
authRoute.post("/logout", logout)

module.exports = authRoute;