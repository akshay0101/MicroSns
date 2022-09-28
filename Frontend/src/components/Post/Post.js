import React, { forwardRef } from "react";
import "./Post.css";
import { Avatar } from "@material-ui/core";
import im from "./im.jpg";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import PublishIcon from "@material-ui/icons/Publish";

const Post = () => {
  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h2>
              Vishal Raj <span className="post__headerSpecial">@ saitama</span>
            </h2>
          </div>
          <div className="post__headerDescription">
            <p>
              Lorem Ipsum is simply dummy text of the printing a unchang the
              printing a unchangthe printing a unchangey text of the printing a
              unchang the printing a unchangthe printing a unchangey text of the
              printing a unchang the printing a unchangthe printing a unchangey
              text of the printing a unchang the printing a unchangthe printing
              a unchangey text of the printing a unchang the printing a
              unchangthe printing a unchanged.{" "}
            </p>
          </div>
        </div>
        <img src={im} alt=" what ?" />
        <div className="post__footer">
          <ChatBubbleOutlineIcon
            fontSize="small"
            style={{ color: "rgb(176, 174, 174)" }}
          />
          <RepeatIcon
            fontSize="small"
            style={{ color: "rgb(176, 174, 174)" }}
          />
          <FavoriteBorderIcon
            fontSize="small"
            style={{ color: "rgb(176, 174, 174)" }}
          />
          <PublishIcon
            fontSize="small"
            style={{ color: "rgb(176, 174, 174)" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
