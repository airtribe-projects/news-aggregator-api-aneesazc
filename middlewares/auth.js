const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const validateJWT = (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
        return res.status(401).send({ message: "Unauthorized" });
    }
    req.user = decodedToken;
    next();
}

module.exports = { validateJWT };