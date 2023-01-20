const express = require("express");
const morgan = require("morgan");
const layout = require("./views/layout");
const users = require("./routes/users");
const wiki = require("./routes/wiki");
const { db } = require("./models");

PORT = 3000;

const app = express();

// parses url-encoded bodies
app.use(express.urlencoded({ extended: false }));

// parses json bodies
app.use(express.json());

db.authenticate().then(() => {
  console.log("connected to the database");
});

app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.redirect("/wiki");
});

app.use("/users", users);

app.use("/wiki", wiki);

const init = async () => {
  await db.sync();
  //   await db.sync({ force: true });
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}!`);
  });
};

init();
