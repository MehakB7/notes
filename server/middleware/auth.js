const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

  if (!decodedToken) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorized" });
  }

  req.headers.email = decodedToken.email;
  next();
};

module.exports = {
  auth,
};
