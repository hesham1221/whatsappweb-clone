import React, { useState } from "react";

import "../styles/sidebar.css";
import { IconButton } from "@material-ui/core";
import { Chat, DonutLarge, MoreVert, SearchOutlined } from "@material-ui/icons";
import Chats from "./Chats";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions } from "../redux/user-slice";
const SideBar = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const myU = useSelector((state) => state.userSlice.myUser);
  const showSelected = useSelector((state) => state.userSlice.showSelected);
  const LogoutHandler = () => {
    dispatch(
      actions.setMyUser({
        user_name: "",
        email: "",
        prifile_url: "",
        bio: "",
        uid: "",
      })
    );
    localStorage.removeItem("whatsapp-clone");
    localStorage.removeItem("whatsapp-clon-info-uid");
    localStorage.removeItem("whatsapp-clon-info-user_name");
    localStorage.removeItem("whatsapp-clon-info-bio");
    localStorage.removeItem("whatsapp-clon-info-profile_url");
    dispatch(actions.setIsLogin(false));
  };
  return (
    <div className={`sidebar ${showSelected && "notselected"}`}>
      <div className="sidebar__header">
        <img src={myU.profile_url} className="avatar" alt="avatar" />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton onClick={() => dispatch(actions.setShowUsers())}>
            <Chat />
          </IconButton>
          <div className="logoutlist">
            <IconButton onClick={() => setOpen((prev) => !prev)}>
              <MoreVert />
            </IconButton>
            {open && (
              <div className="logout">
                <span onClick={LogoutHandler}>Logout</span>
              </div>
            )}
          </div>
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
