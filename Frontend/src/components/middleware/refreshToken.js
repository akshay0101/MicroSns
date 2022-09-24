import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

const axiosJWT = axios.create();

axiosJWT.interceptors.request.use(
  async (config) => {
    const response = await axios.get("http://localhost:3001/api/users/token");
    console.log(" this interceptor has been trigerred ");
    config.headers.Authorization = `Bearer ${response.data.accessToken}`;
    //   setToken(response.data.accessToken);
    //   const decoded = jwt_decode(response.data.accessToken);
    //   setName(decoded.name);
    //   setUserId(decoded.userId);
    //   setExpire(decoded.exp);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

module.exports = axiosJWT;
