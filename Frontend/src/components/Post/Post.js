import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";

import "./Post.css";
import { Avatar, Button, TextField } from "@material-ui/core";
import im from "./im.jpg";
import ChatBubbleOutlineIcon from "@material-ui/icons/ChatBubbleOutline";
import RepeatIcon from "@material-ui/icons/Repeat";
import FavoriteIcon from "@material-ui/icons/Favorite";
import AddBoxRoundedIcon from "@material-ui/icons/AddBoxRounded";
import PublishIcon from "@material-ui/icons/Publish";
import DeleteIcon from "@material-ui/icons/Delete";

import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";

import { Alert, AlertTitle } from "@mui/material";

const Post = (props) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  const history = useHistory();

  useEffect(() => {
    refreshToken();
    //getUsers();
  }, []);

  const refreshToken = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/users/token");
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      console.log(" frontend user details ", decoded);
      setName(decoded.name);
      setUserId(decoded.userId);
      setUsername(decoded.username);

      setExpire(decoded.exp);
      console.log(username);
      console.log(" this is my toke ", token);
    } catch (error) {
      if (error.response) {
        history.push("/");
      }
    }
  };
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const currentDate = new Date();
      if (expire * 1000 < currentDate.getTime()) {
        const response = await axios.get(
          "http://localhost:3001/api/users/token"
        );
        console.log(" this interceptor has been trigerred ");
        config.headers.Authorization = `Bearer ${response.data.accessToken}`;
        setToken(response.data.accessToken);
        const decoded = jwt_decode(response.data.accessToken);
        setName(decoded.name);
        setUserId(decoded.userId);
        setExpire(decoded.exp);
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // const getUsers = async () => {
  //   const response = await axiosJWT.get("http://localhost:3001/api/users/all", {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  //   //console.log("check token ", token);

  //   setUsers(response.data);
  //   console.log("they are the users ", response.data);
  // };

  // const getPosts = async () => {
  //   const response = await axiosJWT.get(
  //     "http://localhost:3001/api/users/getPosts",
  //     {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     }
  //   );
  //   const data = response.data;
  //   setPosts(data.data);

  //   console.log("they are the posts ", data.data);
  // };

  // const logout = async () => {
  //   const response = await axios.get("http://localhost:3001/api/users/logout");

  //   // const response = await axiosJWT.get(
  //   //   "http://localhost:3001/api/users/logout",
  //   //   {
  //   //     headers: {
  //   //       Authorization: `Bearer ${token}`,
  //   //     },
  //   //   }
  //   // );

  //   if (response) console.log(" logged out ");
  //   else console.log(" error ");
  //   history.push("/");
  // };

  const deleteTweet = async (uid, pid) => {
    const decoded = jwt_decode(token);
    console.log("decoded ", decoded);
    console.log(" uid ", uid);
    console.log(" pid ", pid);

    if (String(decoded.userId) === String(uid)) {
      console.log(" let's see ");
      const response = await axios.delete(
        `http://localhost:3001/api/users/post/${pid}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: {
            id: pid,
          },
        }
      );

      return response;
    } else {
      console.log(" unauthorized access ");
      alert(" unauthorized ");
    }
  };

  // const iLiked = async (pid) => {
  //   console.log(pid, userId);
  //   const response = await axiosJWT.get(
  //     `http://localhost:3001/api/users/iLiked/${pid}/${userId}`
  //   );

  //   console.log(" what ", response);

  //   return response;
  // };

  const likeTweet = async (pid) => {
    console.log(" liking tweet ,,,,,,,,,");

    const decoded = jwt_decode(token);
    const uid = decoded.userId;
    const data = { userId: uid, tweetId: pid };
    console.log(" like data ", data);

    return axiosJWT
      .post(
        "http://localhost:3001/api/users/likeTweet",
        {
          userId: parseInt(uid),
          tweetId: pid,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((resp) => resp.data)
      .catch((error) => {
        console.log(error);
        alert("You already liked this post!");
      });
  };

  const addComment = async (e) => {
    e.preventDefault();

    console.log("----------------------------------------------", comment);
    try {
      const auth = await axiosJWT.post(
        "http://localhost:3001/api/users/comment/add",
        {
          userId: userId,
          tweetId: props.id,
          text: comment,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      history.push("/dashboard");

      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        This is a success alert — <strong>check it out!</strong>
      </Alert>;

      alert(" Comment submitted ");

      console.log(" comment added   -------------------------");
      setComment("");
      return auth;
    } catch (error) {
      console.log(error, "   -------------------------");

      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  };

  return (
    <div className="post">
      <div className="post__avatar">
        <Avatar />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h2>
              {props.userId} <span className="post__headerSpecial">@</span>
            </h2>
          </div>
          <div className="post__headerDescription">
            <p>{props.text}</p>
          </div>
        </div>
        {props.media ? (
          <img src={props.media} alt="" />
        ) : (
          <img src={im} alt="" />
        )}
        <div className="compose-form-container">
          {/* {/* <Avatar /> */}
          <input
            className="compose-form-textarea"
            placeholder="what do you think ?"
            onChange={(event) => {
              setComment(event.target.value);
            }}
          />
          <AddBoxRoundedIcon
            className="compose-form-textarea"
            onClick={addComment}
          />
        </div>

        <div className="post_info">0 likes 0 comments </div>

        <div className="post__footer">
          <div className="foot">
            <ChatBubbleOutlineIcon
              id="commentbox"
              fontSize="small"
              // style={{ color: "rgb(176, 174, 174)" }}
              onClick={() => {}}
            />
          </div>

          <FavoriteIcon
            id="like"
            fontSize="small"
            // style={{ color: "rgb(176, 174, 174)" }}
            onClick={() => {
              likeTweet(props.id);
            }}
          />
          <RepeatIcon
            id="repeat"
            fontSize="small"
            // style={{ color: "rgb(176, 174, 174)" }}
            onClick={() => {}}
          />
          <DeleteIcon
            id="delete"
            fontSize="small"
            // style={{ color: "rgb(176, 174, 174)" }}
            onClick={() => {
              deleteTweet(props.userId, props.id);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Post;
