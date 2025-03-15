const express=require("express");
const { getUserProfile, FollowUnfollowUser } = require("../controllers/user.controller");

const userRoutes=express.Router();

userRoutes.get("/user/:username",getUserProfile);
userRoutes.post("/follow/:id",FollowUnfollowUser);
// userRoutes.post("/update",updateuser);
// userRoutes.post("/suggeted",getuserprofile);

module.exports =userRoutes;