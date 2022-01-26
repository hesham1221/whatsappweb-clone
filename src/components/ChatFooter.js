import React, { useEffect, useMemo, useRef, useState } from "react";
import { Attachment, InsertEmoticon, Mic } from "@material-ui/icons/";
import "../styles/chat-footer.css";
import { IconButton } from "@material-ui/core";
import { collection, doc, getDoc, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-confige";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
import { useDispatch } from "react-redux";
import { actions } from "../redux/user-slice";
const ChatFooter = () => {
  const dispatch = useDispatch()
  const [showEmoje, setShowEmoje] = useState(false);
  const [timePeriod, setTimePeriod] = useState("am");
  const showusers = useSelector(state => state.userSlice.showUsers)
  const chatMessages = useSelector((state) => state.userSlice.messages);
  const messageRef = useRef();
  const emojiClickHandler = (even, emoji) => {
    setMessage((prev) => (!!prev ? prev + emoji.emoji : emoji.emoji));
  };
  useEffect(() => {
    const when = new Date();
    when.getHours() > 12 && setTimePeriod("pm");
  }, []);
  const sender = useSelector((state) => state.userSlice.myUser.user_name);
  const user = useSelector((state) => state.userSlice);
  const [message, setMessage] = useState();
  const sendMessageHandler = async (e) => {
    e.preventDefault();
    const now = new Date();
    const hours = now.getHours() < 12 ? now.getHours() : now.getHours() - 12;
    const time =
      ("0" + hours).slice(-2) +
      ":" +
      ("0" + now.getMinutes()).slice(-2) +
      " " +
      timePeriod;
    const payload = {
      from: sender,
      to: user.user.user_name,
      message: message,
      time: time,
    };
    if (chatMessages.length !== 0) {
      const doc2 = doc(db, "chats", user.id);
      const docs = await getDoc(doc2);
      const prevdocs = docs.data();
      const docRef = doc(db, "chats", user.id);
      updateDoc(docRef, {
        ...prevdocs,
        messages: [...prevdocs.messages, payload],
      });
    } else {
      const newdoc = await addDoc(collection(db, "chats"), {
        from: sender,
        to: user.user.user_name,
        messages: [
         payload,
        ],
      });
      dispatch(actions.setId(newdoc.id))
      dispatch(actions.setMessages([payload]))
    }
    setMessage(() => "");
    console.log(showusers)
    showusers&& dispatch(actions.setShowUsers())
  };
  return (
    <form onSubmit={sendMessageHandler} className="chat__footer">
      <div className="emoji">
        {showEmoje && (
          <EmojiPicker
            onEmojiClick={emojiClickHandler}
            pickerStyle={{
              marginTop: "-53vh",
              position: "absolute",
              width: "30vw",
            }}
          />
        )}
        <IconButton onClick={() => setShowEmoje((prev) => !prev)}>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <Attachment />
        </IconButton>
      </div>
      <div className="search__container">
        <input
          value={message}
          ref={messageRef}
          onChange={(e) => setMessage(e.target.value)}
          type="text"
          placeholder="Type a message "
          className="search-input"
        />
      </div>
      <IconButton>
        <Mic />
      </IconButton>
    </form>
  );
};

export default ChatFooter;
