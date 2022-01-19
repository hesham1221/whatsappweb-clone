import React, { useRef, useState } from "react";
import { Attachment, InsertEmoticon, Mic } from "@material-ui/icons/";
import "../styles/chat-footer.css";
import { IconButton } from "@material-ui/core";
import {  doc,getDoc,updateDoc} from "firebase/firestore";
import { db } from "../firebase-confige";
import { useSelector } from "react-redux";
const ChatFooter = () => {
  const sender = 'test'
  const user = useSelector(state => state.userSlice)
  const messageRef = useRef();
  const [message,setMessage] = useState()
  const sendMessageHandler = async(e) =>{
    e.preventDefault();
    const doc2 = doc(db,'chats',user.id)
    const docs = await getDoc(doc2)
    const prevdocs = docs.data()
    const docRef = doc(db,'chats',user.id);
    const payload = {from : sender , to: user.user.user_name, message : message ,time: '5:09 am'}
    updateDoc(docRef,{
     ...prevdocs,
     messages : [...prevdocs.messages ,payload]
    })
    setMessage(()=> '')
  }
  return (
    <form onSubmit={sendMessageHandler} className="chat__footer">
      <div className="emoji">
        <IconButton>
          <InsertEmoticon />
        </IconButton>
        <IconButton>
          <Attachment />
        </IconButton>
      </div>
      <div className="search__container">
        <input
        value={message}
          ref ={messageRef}
          onChange={(e)=>setMessage(e.target.value)}
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
