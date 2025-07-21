import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Access token missing or malformed" });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    try {
        const secretKey = process.env.JWT_SECRET || "TaskManagement"; // Keep this secret in .env
        const decoded = jwt.verify(token, secretKey);
        req.user = decoded; // You can access user info in future routes
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};


export default verifyToken;