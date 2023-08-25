const { Notes } = require("../modal/notes");
const jwt = require("jsonwebtoken");
const { User } = require("../modal/users");
const { StatusCodes } = require("http-status-codes");

const addNote = async (req, res) => {
  const email = req.headers.email;
  const user = await User.findOne({ email });
  const { title, body } = req.body;
  if (!title && !body) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Data is not corrent" });
  }

  try {
    const note = new Notes({
      title,
      body,
      user,
    });
    const save = await note.save();
    res.status(StatusCodes.CREATED).json({ id: save._id });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

const deleteNote = async (req, res) => {
  const id = req.params.id;

  const notes = await Notes.findOne({ _id: id });
  if (!notes) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Data is not corrent" });
  }

  try {
    const data = await Notes.deleteOne({ _id: id });
    res
      .status(StatusCodes.OK)
      .json({ message: "resource removed sucessfully" });
  } catch (e) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: e.message });
  }
};

const getNotes = (req, res) => {};

const editNotes = (req, res) => {};

module.exports = {
  addNote,
  deleteNote,
};
