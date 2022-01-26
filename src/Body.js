import Chat from './components/Chat';
import React from 'react';
import { useSelector } from 'react-redux';
import NoChat from './components/NoChat';
import SideBar from './components/SideBar';

const Body = () => {
    const notSelected = !!useSelector(state => state.userSlice.user)[0]
  return <>
      <SideBar />
    {notSelected? <NoChat /> :<Chat /> }
  </>;
};

export default Body;
