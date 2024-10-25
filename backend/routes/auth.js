//for Authentication 
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    // Retrieve the token from the Authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    // Verify the token
    jwt.verify(token, "tcmTm", (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token." });
        }

        // Attach the user object to the request (can be used in next middleware or routes)
        req.user = user;
        next(); // Continue to the next middleware or route handler
    });
};
module.exports = { authenticateToken };