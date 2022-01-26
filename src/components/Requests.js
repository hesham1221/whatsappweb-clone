import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { db } from '../firebase-confige';
import { actions } from '../redux/user-slice';

const Requests = () => {
    const [userNamesList,setUserNamesList] = useState();
    const myUID = useSelector(state => state.userSlice.myUser.uid);
    const dispatch = useDispatch()

    // getting users 
    useEffect(() => {
        onSnapshot(collection(db,'users') ,(snap) => {
            const users = snap.docs.map(doc => ({...doc.data(),id : doc.id}))
            dispatch(
                actions.setUsers(users)
            )
        })
      }, []);


      //getting chats
      useEffect(
        () =>
          onSnapshot(collection(db, "chats"), (snap) => {
            const chats = snap.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            const filteredChats = chats.filter(chat => chat.from === myUID|| chat.to === myUID)
            dispatch(
              actions.setChatList(
               filteredChats
              )
            );
          }),
        []
      );
      return <div>empty</div>
};

export default Requests;
