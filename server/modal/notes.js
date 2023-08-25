const mongooes = require("mongoose");

const NoteSchema = new mongooes.Schema({
  title: {
    type: String,
    require: true,
  },
  body: {
    type: String,
    require: true,
  },
  user: {
    type: mongooes.Schema.ObjectId,
    ref: "User",
  },
});

const Notes = mongooes.model("Note", NoteSchema);

module.exports = {
  Notes,
};
