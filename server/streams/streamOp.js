const fs = require("fs");
const path = require("path");

const location = path.join(__dirname, "..", "fileDB/users.tsv");

const startReadStream = () => {
  // this is the read stream using the flow mode
  let data = "";
  const readStream = fs.createReadStream(location, "utf-8");

  readStream.on("data", (chunk) => {
    data += chunk;
  });

  readStream.on("end", () => {
    console.log("reading data done", data);
  });
};

const startReadWithPause = () => {
  const readStream = fs.createReadStream(location, "utf-8");
  let data = "";

  readStream.on("readable", () => {
    while ((chunk = readStream.read())) {
      data += chunk;
    }
  });

  readableStream.on("end", function () {
    console.log("Start reading using pause mode", data);
  });
};

const startWritingStream = () => {
  const readStream = fs.createReadStream(location, "utf-8");
  const writable = fs.createWriteStream("./file.text");

  readStream.on("data", (chunk) => {
    writable.write(chunk);
  });
};

module.exports = {
  startReadStream,
  startReadWithPause,
  startWritingStream,
};
