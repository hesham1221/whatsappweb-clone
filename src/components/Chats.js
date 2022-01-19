import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-confige";
import { useDispatch } from "react-redux";
import { actions } from "../redux/user-slice";
import "../styles/chats.css";
import { useSelector } from "react-redux";
const Chats = () => {
  const dispatch = useDispatch();
  const username = "test";
  const chatsList = useSelector(state=> state.userSlice.chatList);
  const [selectedUser, setSelectedUser] = useState();
  const selectChatHandler = (messages,id, userInfo) => {
    dispatch(actions.setMessages(messages));
    dispatch(actions.setUser(userInfo));
    dispatch(actions.setId(id))
    setSelectedUser(userInfo.user_name);
  };

  const [userNamesList, setUserNamesList] = useState([]);

  useEffect(() => {
    const userNames = collection(db, "users");
    const getUsers = async () => {
      const users = await getDocs(userNames);
      setUserNamesList(
        users.docs.map((user) => ({ ...user.data(), id: user.id }))
      );
    };
    getUsers();
  }, []);
  

  return (
    <div className="chatList__container">
      {}
      {chatsList.map((chat) => (
        <div
          className={`chatsList ${
            selectedUser === (chat.from !== username ? chat.from : chat.to) &&
            "selected"
          }`}
          onClick={() =>
            selectChatHandler(
              chat.messages,
              chat.id,
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
