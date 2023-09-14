/**
 *  Read a file in
 */

const fs = require("fs").promises;
const path = require("path");

const fileLocation = path.join(__dirname, "..", "fileDB", "users.tsv");

const createFile = async () => {
  const headers = "uuid,title,body";
  try {
    const file = await fs.writeFile(fileLocation, headers);
    console.log("file created successfully");
    return file;
  } catch (e) {
    console.log("error while creating the file", e);
  }
};

const editOne = async (uuid, values) => {
  try {
  } catch {}
};

const deleteOne = async () => {};

const readFile = async () => {
  try {
    const file = await fs.readFile(fileLocation);
    return file.toString();
  } catch (e) {
    if (e.code == "ENOENT") {
      const file = await createFile();
      console.log("file is", file);
      return file;
    }
  }
};

const findOne = async (uuid) => {
  try {
    const file = await readFile();
    const data = file.split("\n");
    const item = data.find((item) => {
      const id = item.split(",")[0];
      return id == uuid;
    });
    if (item) {
      console.log("item is", item);
      return item;
    } else {
      console.log("No item found", item);
    }
  } catch (e) {
    console.log("errore while reading file", e);
  }
};

const addOne = async (title, body) => {
  try {
    const file = await readFile();
    const data = file?.split("\n");
    const uuid = data.length;
    const newData = `\n${uuid},${title},${body}`;
    await fs.writeFile(fileLocation, newData, { flag: "a" });
  } catch (e) {
    console.log("errore while reading file");
  }
};

module.exports = {
  createFile,
  readFile,
  addOne,
  findOne,
};
