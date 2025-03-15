const jwt = require("jsonwebtoken");

// Middleware to generate JWT and set it in cookies
const generateTokenandSetCookies = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d", // Token valid for 1 day
  });

  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // ✅ 15 days in milliseconds
    httpOnly: true, // ✅ Protects against XSS attacks
    secure: process.env.NODE_ENV !== "development", // ✅ Secure in production
    sameSite: "strict", // ✅ Prevents CSRF attacks
  });
};

module.exports = generateTokenandSetCookies;
