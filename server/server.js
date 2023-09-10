const express = require("express");
const helmet = require("helmet");
const multer = require("multer");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const { authRouter } = require("./routes/auth");
const { notes } = require("./routes/notes");
const { port, db_url } = require("./config");

const swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.json());
app.use(helmet());

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./assets");
//   },
//   filename: function (req, file, cb) {
//     console.log("inside this fileName is", file);
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });
// const upload = multer({ storage: storage });

// app.post("/add-image", upload.single("image"), (req, res) => {
//   return res
//     .status(StatusCodes.OK)
//     .json({ message: "file uploaded successfully" });
// });

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/auth", authRouter);
app.use("/notes", notes);

mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    server = app.listen(port, () => {
      console.log("start server at port", port);
      app.emit("appStarted");
    });
  });

module.exports = { app };
