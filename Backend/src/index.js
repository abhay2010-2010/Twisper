
const express=require("express");
const authRoute=require("./routes/auth.route")
const DbConnect = require("./Connection/DbConnect");
const cookieParser=require("cookie-parser");
const userRoutes = require("./routes/user.route");
require("dotenv").config(); // Load environment variables

const app=express();
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cookieParser())


app.use("/api/auth",authRoute)
app.use("/api/user",userRoutes)

app.listen(process.env.PORT || 1111,async()=>{
    try {
        await DbConnect
        console.log("Database connected succefully")
    } catch (error) {
        console.log("unable to connect",error)
    }
    console.log("server is euuning")
    
});