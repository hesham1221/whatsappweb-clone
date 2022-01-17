import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-confige";
import { useDispatch } from "react-redux";
import { actions } from "../redux/user-slice";
import "../styles/chats.css";
const Chats = () => {
  const dispatch = useDispatch();
  const [selectedUser, setSelectedUser] = useState();
  const username = "test";
  const [chatsList, setChatsList] = useState([]);
  const [userNamesList, setUserNamesList] = useState([]);
  const selectChatHandler = (messages, userInfo) => {
    dispatch(actions.setMessages(messages));
    dispatch(actions.setUser(userInfo));
    setSelectedUser(userInfo.user_name);
  };
  useEffect(() => {
    const chatsCollections = collection(db, "chats");
    const userNames = collection(db, "users");
    const getChats = async () => {
      const chatsdata = await getDocs(chatsCollections);
      setChatsList(
        chatsdata.docs.map((chat) => ({ ...chat.data(), id: chat.id }))
      );
    };
    const getUsers = async () => {
      const users = await getDocs(userNames);
      setUserNamesList(
        users.docs.map((user) => ({ ...user.data(), id: user.id }))
      );
    };
    getChats();
    getUsers();
  }, []);
  return (
    <div className="chatList__container">
      {chatsList.map((chat) => (
        <div
          className={`chatsList ${
            selectedUser === (chat.from !== username ? chat.from : chat.to) &&
            "selected"
          }`}
          onClick={() =>
            selectChatHandler(
              chat.messages,
              userNamesList.filter(
                (name) =>
                  name.user_name ===
                  (chat.from !== username ? chat.from : chat.to)
              )[0]
            )
          }
          key={chat.id}
        >
          <img
            className="profile_pic"
            src={
              userNamesList.filter(
                (name) =>
                  name.user_name ===
                  (chat.from !== username ? chat.from : chat.to)
              )[0]
                ? userNamesList.filter(
                    (name) =>
                      name.user_name ===
                      (chat.from !== username ? chat.from : chat.to)
                  )[0].profile_url
                : ""
            }
            alt="profile pic"
          />
          <div className="chat_texts">
            <div>
              <h4 className="chatheader">
                {chat.from !== username ? chat.from : chat.to}
              </h4>
              <p className="lastmassage">
                {chat.messages[chat.messages.length - 1].message}
              </p>
            </div>
            <p className="time">
              {chat.messages[chat.messages.length - 1].time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
