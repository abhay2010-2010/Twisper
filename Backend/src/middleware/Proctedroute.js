const jwt = require("jsonwebtoken");
const User = require("../schema/User.modal");


// Middleware to validate JWT token
const protectedRoute = async (req, res, next) => {
  try {
    // ✅ Get token from cookies
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Token not found" });
    }

    // ✅ Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded) {
      return res.status(401).json({ error: "Invalid token" });
    }

    // ✅ Find user and exclude password
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Attach user data to request object
    req.user = user;
    next(); // ✅ Call next() to proceed

  } catch (error) {
    console.error("Protected Route Error:", error);
    res.status(401).json({ error: "Unauthorized access" });
  }
};

module.exports = protectedRoute;
