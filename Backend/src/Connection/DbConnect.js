const mongoose = require("mongoose");
require("dotenv").config();
console.log(process.env.MONGO_URL)

const DbConnect = mongoose.connect(process.env.MONGO_URL);
module.exports = DbConnect;