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

const iLiked = async (uid, pid) => {
  console.log(" req of Iliked ", req);
  const like = await Likes.findOne({
    where: {
      userId: uid,
      tweetId: pid,
    },
  });
  console.log(" i lked ", like);
  return like;
  // if (!like) return res.sendStatus(204);
  // else
  //   return res.json({
  //     success: 1,
  //     data: like,
  //   });
};

module.exports = {
  likeTweet,
  getTweetsLikes,
  iLiked,
};
