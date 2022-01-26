import React from 'react';
import Logo from '../assest/whatsappicon.svg';
import '../styles/nochat.css'

const NoChat = () => {
  return <div className='nochat'>
      <div className="nochatmessage">
            <img src={Logo} className='nochat-logo' alt='whats app logo' />
            <div className="nochatmessage-text">
                <h1>Choose a Chat to Chat</h1>
                <div className="uderHeader">
                    Select a chat in the sidebar of go to users(contacts) then choose one
                </div>
                <div className="warning">KEEP IT CLEAN</div>
            </div>
      </div>
  </div>;
};

export default NoChat;
