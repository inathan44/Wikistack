const express = require("express");
const router = express.Router();
const userList = require("./../views/userList");
const { Page, User } = require("../models");
const userPages = require("./../views/userPages");

router.get("/", async (req, res, next) => {
  try {
    res.send(userList([]));
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const author = await User.findOne({
      where: {
        id: req.params.id,
      },
    });
    console.log("<<<<<<AUTHORS.id>>>>>>", author.id);

    const authorPages = await Page.findAll({
      where: {
        authorId: author.id,
      },
    });
    // console.log("<<<<<<AUTHORPAGES>>>>>>>", authorPages);

    res.send(userPages(author, authorPages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    //CHANGE LINE BELOW
    res.send(userList([]));
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    //CHANGE LINE BELOW
    res.send(userList([]));
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    //CHANGE LINE BELOW
    res.send(userList([]));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
