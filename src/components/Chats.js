import React, { useEffect, useState } from "react";
import { collection,onSnapshot } from "firebase/firestore";
import { db } from "../firebase-confige";
import { useDispatch } from "react-redux";
import { actions } from "../redux/user-slice";
import "../styles/chats.css";
import { useSelector } from "react-redux";
const Chats = () => {
  useEffect(
    () =>
      onSnapshot(collection(db, "chats"), (snap) => {
        const chats = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        const filteredChats = chats.filter(
          (chat) => chat.from === username || chat.to === username
        );
        dispatch(actions.setChatList(filteredChats));
      }),
    []
  );
  const showUsers = useSelector((state) => state.userSlice.showUsers);
  const dispatch = useDispatch();
  const username = useSelector((state) => state.userSlice.myUser.user_name);
  const users = useSelector((state) => state.userSlice.users).filter(
    (user) => user.user_name !== username
  );
  const chatsList = useSelector((state) => state.userSlice.chatList);
  const [selectedUser, setSelectedUser] = useState();
  const selectChatHandler = (messages, id, userInfo) => {
    if (messages.length !== 0 && id.trim().length !== 0) {
      dispatch(actions.setMessages(messages));
      dispatch(actions.setUser(userInfo));
      dispatch(actions.setId(id));
      setSelectedUser(userInfo.user_name);
    } else {
      const con = chatsList.filter(
        (chat) =>
          chat.from === userInfo.user_name || chat.to === userInfo.user_name)
          console.log(con)
      if (con.length !== 0) {
        const newChat = chatsList.filter(
          (chat) =>
            chat.from === userInfo.user_name || chat.to === userInfo.user_name
        )[0];
        dispatch(actions.setMessages(newChat.messages));
        dispatch(actions.setId(newChat.id));
      } else {
        dispatch(actions.setMessages([]));
        dispatch(actions.setId(""));
      }
      dispatch(actions.setUser(userInfo));
      setSelectedUser(userInfo.user_name);
    }
    dispatch(actions.setShowSelected(true));
  };

  const userNamesList = useSelector((state) => state.userSlice.users);
 


  return (
    <div className="chatList__container">
      {}
      {!showUsers
        ? chatsList.map((chat) => (
            <div
              className={`chatsList ${
                selectedUser ===
                  (chat.from !== username ? chat.from : chat.to) && "selected"
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
                    {chat.messages[chat.messages.length - 1]?.message}
                  </p>
                </div>
                <p className="time">
                  {chat.messages[chat.messages.length - 1]?.time}
                </p>
              </div>
            </div>
          ))
        : users.map((user) => (
            <div
              className={`chatsList ${
                selectedUser === user.user_name && "selected"
              }`}
              onClick={() => selectChatHandler([], "", user)}
              key={user.id}
            >
              <img
                className="profile_pic"
                src={user.profile_url}
                alt="profile pic"
              />
              <div className="chat_texts">
                <div>
                  <h4 className="chatheader">{user.user_name}</h4>
                  <p className="lastmassage">{user.bio}</p>
                </div>
              </div>
            </div>
          ))}
    </div>
  );
};
export default Chats;
