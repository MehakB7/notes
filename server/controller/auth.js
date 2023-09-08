const { StatusCodes } = require("http-status-codes");
const bcript = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../modal/users");

const register = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  if (!firstName || !lastName || !email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Please Provide Required Information",
    });
  }

  const salt = await bcript.genSalt();
  const passwordHash = await bcript.hash(password, salt);

  try {
    const user = await User.findOne({ email });
    if (user) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "User already registered",
      });
    } else {
      const newUser = new User({
        firstName,
        lastName,
        email,
        password: passwordHash,
      });

      const save = newUser.save();
      res.status(StatusCodes.CREATED).json(save);
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: e.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email && !password) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Please Provide Required Information" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email address" });
    }

    const isSame = bcript.compare(password, user.password);
    if (!isSame) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Invalid email address" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET);
    res.status(StatusCodes.OK).json({ token });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

const whoami = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: "Unauthorize" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const email = decodedToken.email;
    const user = await User.find({ email });

    if (!user) {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: "user not found" });
    } else {
      delete user.password;
      res.status(StatusCodes.OK).json({ user });
    }
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

module.exports = {
  register,
  login,
  whoami,
};
