import React from "react";

import "../styles/sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import Chats from "./Chats";
const SideBar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar__header">
          <Avatar className="avatar"/>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__search-container">
          <SearchOutlined className="searchIcon" />
          <input type="text" placeholder="search or start new chat" />
        </div>
      </div>
      <div className="sidebar__chats">
        <Chats />
      </div>
    </div>
  );
};

export default SideBar;
