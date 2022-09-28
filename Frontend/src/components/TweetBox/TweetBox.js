import React, { useState } from "react";
import "./TweetBox.css";
import { Avatar, Button } from "@material-ui/core";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import ImageIcon from "@material-ui/icons/Image";

function ComposeForm() {
  return (
    <form className="compose-form">
      <div className="compose-form-container">
        {/* <Avatar /> */}
        <textarea
          className="compose-form-textarea"
          placeholder="What's happening?"
        />
      </div>
      <div className="compose-buttons">
        <Button className="compose-image-submit">
          <ImageIcon className="img" />
        </Button>
        <Button className="compose-form-submit">Tweet</Button>
      </div>
    </form>
  );
}

export default ComposeForm;
