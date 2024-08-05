const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  try {
   
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Authentication failed: Token not found" });
    }

    
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Authentication failed: Invalid token" });
  }
};

module.exports = authenticate;