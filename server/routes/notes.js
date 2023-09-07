const {
  addNote,
  deleteNote,
  getNotes,
  editNote,
} = require("../controller/notes");
const { auth } = require("../middleware/auth");
const express = require("express");
const route = express.Router();

route.post("/", addNote);
route.get("/", getNotes);

route.put("/:id", editNote);

route.delete("/:id", deleteNote);

module.exports = {
  notes: route,
};
