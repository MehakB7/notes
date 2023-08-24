const mongooes = require("mongoose");

const UserSchema = new mongooes.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      max: 7,
    },
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 5,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 5,
    },
  },
  { timestamps: true }
);

const User = mongooes.model("User", UserSchema);

module.exports = {
  User: User,
};
