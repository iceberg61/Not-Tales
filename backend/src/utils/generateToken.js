const jwt = require("jsonwebtoken");

// Payload carries id + role — middleware/auth.js reads req.user.role
// for the adminOnly check, so role has to be on the token itself.
function generateToken(user) {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || "7d" }
  );
}

module.exports = generateToken;
