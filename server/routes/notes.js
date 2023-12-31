const {
  addNote,
  deleteNote,
  getNotes,
  editNote,
} = require("../controller/notes");
const { auth } = require("../middleware/auth");
const express = require("express");
const route = express.Router();

route.post("/", auth, addNote);
route.get("/", auth, getNotes);

route.put("/:id", auth, editNote);

route.delete("/:id", auth, deleteNote);

module.exports = {
  notes: route,
};
