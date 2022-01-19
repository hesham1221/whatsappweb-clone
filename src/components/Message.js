import { collection, onSnapshot } from "firebase/firestore";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/user-slice";
import { db } from "../firebase-confige";
import "../styles/message.css";
const Message = () => {
  const dispatch = useDispatch();
  const messageRef = useRef();
  const user = useSelector((state) => state.userSlice.user.user_name);
  const id = useSelector((state) => state.userSlice.id);
  const chatList = useSelector((state) => state.userSlice.chatList);
  const old_messages = useSelector((state) => state.userSlice.messages);
  const messages =
    chatList.filter((chat) => chat.id === id).length === 0
      ? [{ messages: old_messages }]
      : chatList.filter((chat) => chat.id === id);
  const scrollToEnd = () => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(() => {
    scrollToEnd();
  }, [messages]);
  useEffect(
    () =>
      onSnapshot(collection(db, "chats"), (snap) => {
        dispatch(
          actions.setChatList(
            snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
          )
        );
      }),
    []
  );
  return (
    <div className="message__body">
      {messages[0].messages.map((message) => (
        <div
          key={Math.round(Math.random() * 100000 + 1)}
          className={`message ${message.from === user ? " reciver" : "sender"}`}
        >
          {" "}
          {message.message}
          <div className="message-time">{message.time}</div>
          <div ref={messageRef} />
        </div>
      ))}
    </div>
  );
};

export default Message;
