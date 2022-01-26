import React from "react";

import "../styles/sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import Chats from "./Chats";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions } from "../redux/user-slice";
const SideBar = () => {
  const dispatch = useDispatch();
  const myU = useSelector(state=>state.userSlice.myUser)
  return (
    <div className="sidebar">
      <div className="sidebar__header">
          <img src={myU.profile_url} className="avatar" alt='avatar' />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton onClick ={()=> dispatch(actions.setShowUsers())}> 
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
