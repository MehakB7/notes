const { addNote, deleteNote } = require("../controller/notes");
const { auth } = require("../middleware/auth");
const express = require("express");
const route = express.Router();

console.log("inside this auth", auth);

route.post("/", auth, addNote);

route.delete("/:id", auth, deleteNote);

module.exports = {
  notes: route,
};
