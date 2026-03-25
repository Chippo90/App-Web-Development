const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecretkey";

exports.protect = (req, res, next) => {

    //Get token from header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Not authorized" });
    }

    try {

        //Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        //Attach user data to request
        req.user = decoded;

        next();

    } catch (error) {
        res.status(401).json({ message: "Token invalid" });
    }
};


//Only admin allowed
exports.adminOnly = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Admin access required" });
    }

    next();
};