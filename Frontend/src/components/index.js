//export { default as Home } from './home/Home'
// export { default as LeftPane } from "./leftPane/LeftPane"
//export { default as RightPane } from './rightPane/RightPane'

import Dashboard from "./home/Dashboard";
import React from "react";
import Upload from "./Upload/Upload";
import Sidebar from "./Sidebar/Sidebar";
import Feed from "./Feed/Feed";
import "./index.css";
import Widgets from "./Widgets/Widgets";

import { RecoilRoot, atom } from "recoil";

const userInfo = atom({
  key: "userState",
  default: [],
});

const Index = () => {
  return (
    <div className="app">
      {/* sidebar */}

      <Sidebar />

      {/* feed */}

      <Feed />

      {/* react make divs on stack so to make them on same line use flex in app.css*/}

      {/* widgets */}

      <Widgets />
    </div>
  );
};

export default Index;
