const express = require("express");
const helmet = require("helmet");

const mongoose = require("mongoose");
const { authRouter } = require("./routes/auth");
const { notes } = require("./routes/notes");

const { port, db_url } = require("./config");

console.log(`Your port is ${port}`, db_url);
const app = express();
app.use(express.json());
app.use(helmet());
app.use("/auth", authRouter);
app.use("/notes", notes);
mongoose
  .connect(db_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log("start server at port", port);
    });
  });
