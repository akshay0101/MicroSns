import React from "react";
import "./Sidebar.css";
import TwitterIcon from "@material-ui/icons/Twitter";
import SidebarOption from "./SidebarOption";
import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import PolymerIcon from "@material-ui/icons/Polymer";
import { Button } from "@material-ui/core";
const Sidebar = () => {
  return (
    <div className="sidebar">
      <PolymerIcon className="sidebar__twitterIcon" />

      <SidebarOption active text="Home" Icon={HomeIcon} />
      <SidebarOption text="Explore" Icon={SearchIcon} />
      <SidebarOption text="Notification" Icon={NotificationsNoneIcon} />
      {/* <SidebarOption text="follow" Icon={PersonAddOutlinedIcon} /> */}
      <SidebarOption text="messages" Icon={MailOutlineIcon} />
      <SidebarOption text="profile" Icon={PermIdentityIcon} />

      <Button variant="outlined" className="sidebar__tweet" fullWidth>
        Tweet
      </Button>
    </div>
  );
};

export default Sidebar;
