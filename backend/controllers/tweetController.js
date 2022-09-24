const db = require("../models");
const bcrypt = require("bcryptjs");
// create main model
const Tweets = db.tweets;
var jwt = require("jsonwebtoken");
require("dotenv").config();

//const upload = require('./upload.js');

const addTweet = async (req, res) => {
  console.log(req.body.text);
  console.log(req.body.media);

  // console.log( req.body.text);

  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  let content = {
    text: req.body.text,
    media: req.body.media,
    userId: req.body.userId,
  };

  try {
    const post = await Tweets.create(content);
    res.status(200).send(post);
    console.log(post);
  } catch (err) {
    console.log(err);

    res.status(500).send({
      message: err.message || "Error occurred while creating the post",
    });
  }
};

const getTweet = async (req, res) => {
  // get the api, check authentication
  // fetch it

  try {
    const tweets = await Tweets.findAll({
      attributes: ["id", "text", "media", "userId"],
    });

    if (tweets) {
      res.json({
        success: 1,
        data: tweets,
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: 0,
      message: " can't fetch tweets data ",
      data: error,
    });
  }
};

module.exports = {
  addTweet,
  getTweet,
};
