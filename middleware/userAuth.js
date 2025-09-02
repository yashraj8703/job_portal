const jwt = require("jsonwebtoken");

const userAuth = async (req, res, next) => {
  try {
    const authorization = req.headers["authorization"];
    if (!authorization)
      return res.status(401).json({ msg: "No authorized token" });

    const token = authorization.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Token not found" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // store userId from JWT in req.user
    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (err) {
    res
      .status(401)
      .json({ error: "Invalid or expired token", details: err.message });
  }
};

module.exports = userAuth;
