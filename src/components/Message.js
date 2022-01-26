import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import "../styles/message.css";
const Message = () => {
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
