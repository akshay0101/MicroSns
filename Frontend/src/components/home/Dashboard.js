/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import { useHistory } from "react-router-dom";
import "./home.scss";
import Upload from "../Upload/Upload";
import Comment from "./Comment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
// import { Alert } from "react-alert";

const Dashboard = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);
  const [token, setToken] = useState("");
  const [expire, setExpire] = useState("");

  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);

  const history = useHistory();

  useEffect(() => {
    refreshToken();
    //getUsers();
    getPosts();
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

  //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJuYW1lIjoidGVzdDEiLCJ1c2VybmFtZSI6InRlc3QxIiwiZW1haWwiOiJ0ZXN0MUBnbWFpbC5jb20iLCJyZWZyZXNoVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKMWMyVnlJanA3SW1sa0lqb3hMQ0p1WVcxbElqb2lkR1Z6ZERFaUxDSjFjMlZ5Ym1GdFpTSTZJblJsYzNReElpd2laVzFoYVd3aU9pSjBaWE4wTVVCbmJXRnBiQzVqYjIwaUxDSnlaV1p5WlhOb1ZHOXJaVzRpT2lKbGVVcG9Za2RqYVU5cFNrbFZla2t4VG1sSmMwbHVValZqUTBrMlNXdHdXRlpEU2prdVpYbEtNV015Vm5sSmFuQTNTVzFzYTBscWIzaE1RMHAxV1ZjeGJFbHFiMmxrUjFaNlpFUkZhVXhEU2pGak1sWjVZbTFHZEZwVFNUWkpibEpzWXpOUmVFbHBkMmxhVnpGb1lWZDNhVTlwU2pCYVdFNHdUVlZDYm1KWFJuQmlRelZxWWpJd2FVeERTbmxhVjFwNVdsaE9iMVpIT1hKYVZ6UnBUMjAxTVdKSGQzTkpiVTU1V2xkR01GcFhVa0prUTBrMlNXcEpkMDFxU1hSTlJHdDBUVlJzVlUxVVFUWk5SR2MyVFhwWmRVMUVRWGRYYVVselNXNVdkMXBIUmpCYVYxSkNaRU5KTmtscVNYZE5ha2wwVFVScmRFMVViRlZOVkVFMlRVUm5OazE2V1hWTlJFRjNWMmxLT1V4RFNuQlpXRkZwVDJwRk1rNXFUVEZQUkVsNVQwUlJjMGx0VmpSalEwazJUVlJaTWsxNldUSlBSRmswVGtnd0xsQXhXVzUxZHpOWlRtaEpWM290TlhCRFluTkZWbE5SWjNVM05tdDBMWFYyV2kxSmFVRTBNVFpNYURRaUxDSmpjbVZoZEdWa1FYUWlPaUl5TURJeUxUQTVMVEU1VkRFd09qQTRPak0yTGpBd01Gb2lMQ0oxY0dSaGRHVmtRWFFpT2lJeU1ESXlMVEE1TFRFNVZERXdPakV4T2pJMExqQXdNRm9pZlN3aWFXRjBJam94TmpZek5qVXhPVEUzTENKbGVIQWlPakUyTmpNM016Z3pNVGQ5LkVwYzkzRndPelFtQTJoRTZDeGhkbmtlOTI3OUpOVE9IcldFTTZSMDhuWWciLCJjcmVhdGVkQXQiOiIyMDIyLTA5LTE5VDEwOjA4OjM2LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDIyLTA5LTIwVDA1OjMxOjU3LjAwMFoifSwiaWF0IjoxNjYzNzMzOTAwLCJleHAiOjE2NjM4MjAzMDB9.g-n94KQJ5DWEMN1cpILUZCln6r5hTYeFgWasYPD94DY

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

  const getUsers = async () => {
    const response = await axiosJWT.get("http://localhost:3001/api/users/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    //console.log("check token ", token);

    setUsers(response.data);
    console.log("they are the users ", response.data);
  };

  const getPosts = async () => {
    const response = await axiosJWT.get(
      "http://localhost:3001/api/users/getPosts",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = response.data;
    setPosts(data.data);

    console.log("they are the posts ", data.data);
  };

  const logout = async () => {
    const response = await axios.get("http://localhost:3001/api/users/logout");

    // const response = await axiosJWT.get(
    //   "http://localhost:3001/api/users/logout",
    //   {
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //     },
    //   }
    // );

    if (response) console.log(" logged out ");
    else console.log(" error ");
    history.push("/");
  };

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

  // const addComment = async (pid) => {

  //   return axiosJWT.post(
  //     "http://localhost:3001/api/users/comment/add",
  //     {
  //       userId:userId,
  //       tweetId: pid,
  //       text:
  //     },
  //   )

  // }

  return (
    <div className="home">
      <h1>Welcome {username} </h1>
      {/* <Upload userId={userId} token={token} /> */}
      <button onClick={getUsers}> check</button>
      <button onClick={logout}> logout</button>

      {/* <button onClick={getPosts}> check posts</button> */}

      <div className="Home">
        {Array.from(posts).map((val, key) => {
          return (
            <div className="Post">
              <div className="Image">
                <img src={val.media} alt="posts" />
              </div>
              <div className="Content">
                <div className="title"> {val.id}</div>
                <div className="description">{val.text}</div>
                <div className="description">
                  {" "}
                  posted by user : {val.userId}
                </div>

                <div className="Engagement">
                  <ThumbUpAltIcon
                    id="likeButton"
                    onClick={() => {
                      likeTweet(val.id);
                    }}
                  />
                  {val.likesCount}
                </div>
                <Comment pid={val.id} />
                <button
                  className="del"
                  onClick={() => deleteTweet(val.userId, val.id)}
                >
                  {" "}
                  delete
                </button>
                {/* {iLiked(val.id) ? <> liked</> : <></>} */}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
