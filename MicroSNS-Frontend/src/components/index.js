//export { default as Home } from './home/Home'
// export { default as LeftPane } from "./leftPane/LeftPane"
//export { default as RightPane } from './rightPane/RightPane'

import LeftPane from "./leftPane/Leftpane";
import Dashboard from "./home/Dashboard";
import React from "react";
import Upload from "./Upload/Upload";

const Index = () => {
  return (
    <div style={{ display: "inline-block" }}>
      {/* <LeftPane /> */}
      <Upload />
      <Dashboard />
    </div>
  );
};

export default Index;
