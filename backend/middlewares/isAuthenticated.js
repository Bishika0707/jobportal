import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    try {
        if (!req.cookies || !req.cookies.token) {
            return res.status(401).json({ message: "No token found", success: false });
        }

        const decode = jwt.verify(req.cookies.token, process.env.SECRET_KEY);

        if (!decode.userId) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        req.id = decode.userId; // ✅ now middleware sets user ID
        next();

    } catch (error) {
        console.log(error);
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired", success: false });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token", success: false });
        }
        return res.status(500).json({ message: "Authentication failed", success: false });
    }
};

export default isAuthenticated;
