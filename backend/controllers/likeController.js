const db = require("../models");
const Likes = db.likes;
const Users = db.users;
const Tweets = db.tweets;
var jwt = require("jsonwebtoken");

const likeTweet = async (req, res) => {
  console.log(" like body ", req.body);

  const [like, created] = await Likes.findOrCreate({
    where: req.body,
    defaults: req.body,
  });

  if (!created) {
    return res.status(403).json({ errors: "Tweet is already liked by user" });
  }
  try {
    await Tweets.increment("likesCount", {
      by: 1,
      where: {
        id: req.body.tweetId,
      },
    });

    return res.status(200).json({ like });
  } catch (err) {
    return res.json({
      success: 0,
      message: err,
    });
  }
};

const getTweetsLikes = async (req, res) => {
  const likes = await Users.findAll({
    attributes: ["username", "name"],
    include: {
      model: Likes,
      required: true,
      attributes: ["id"],
      where: {
        tweetId: req.query.tweetId,
      },
    },
    raw: true,
  });

  return res.status(200).json({ likes });
};

module.exports = {
  likeTweet,
  getTweetsLikes,
};
