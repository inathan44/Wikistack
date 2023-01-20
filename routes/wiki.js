const express = require("express");
const { Page, User } = require("../models");
const router = express.Router();
const wikiPageHTML = require("./../views/wikipage");
const addPage = require("./../views/addPage");
const main = require("./../views/main");

// /wiki/
router.get("/", async (req, res, next) => {
  try {
    const pages = await Page.findAll();

    res.send(main(pages));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const author = req.body.author;
  const email = req.body.email;
  const title = req.body.title;
  const content = req.body.content;
  const status = req.body.status;

  try {
    const user = await User.findOne({
      where: {
        name: author,
      },
    });

    if (user) {
      console.log("<<<<<<USER>>>>>>>", user);

      const page = await Page.create({
        title: title,
        content: content,
        status: status,
        authorId: user.id,
      });
      res.redirect(`/wiki/${page.slug}`);
    } else {
      const newUser = await User.create({
        name: author,
        email: email,
      });

      const page = await Page.create({
        title: title,
        content: content,
        status: status,
        authorId: newUser.id,
      });
      res.redirect(`/wiki/${page.slug}`);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/add", async (req, res, next) => {
  try {
    //CHANGE THIS BELOW
    res.send(addPage());
  } catch (error) {
    next(error);
  }
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });

    const author = await User.findOne({
      where: {
        id: page.authorId,
      },
    });

    res.send(wikiPageHTML(page, author));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
