const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId, // ✅ Fixed `objectId` → `ObjectId`
        ref: "User",
        default: [],
      },
    ],
    followings: [
      {
        type: mongoose.Schema.Types.ObjectId, // ✅ Fixed `objectId` → `ObjectId`
        ref: "User",
        default: [],
      },
    ],
    profileImage: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    link: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

// ✅ Corrected export statement
const User = mongoose.model("TwisUser", UserSchema);
module.exports = User;
