import { IconButton } from "@material-ui/core";
import { ArrowBack, MoreVert, SearchOutlined } from "@material-ui/icons";
import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { actions } from "../redux/user-slice";
import "../styles/chat.css";
import ChatFooter from "./ChatFooter";
import Message from "./Message";
const Chat = () => {
  const username = useSelector((state) => state.userSlice.user);
  const dispatch = useDispatch();
  const showSelected = useSelector(state => state.userSlice.showSelected)
  return (
    <div className={`chat__section ${!showSelected&&'notselected'}`}>
      <div className="chat__header">
        <IconButton onClick={() =>dispatch(actions.setShowSelected(false))}>
          <ArrowBack />
        </IconButton>
        <img
          src={username ? username.profile_url : ""}
          alt="pic"
          className="username_image"
        />
        <div className="header__text">
          <div>
            <h3 className="header__username">{username.user_name}</h3>
            <p className="header__bio">{username.bio || "dumb"}</p>
          </div>
          <div className="header__right">
            <IconButton>
              <SearchOutlined />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </div>
        <div className="chat__body">
          <Message />
        </div>
        <ChatFooter />
    </div>
  );
};

export default Chat;
