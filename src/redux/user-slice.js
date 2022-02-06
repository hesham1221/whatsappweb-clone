import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [{ user_name: "", bio: "", profile_url: "" }],
  messages: [{}],
  id: "",
  chatList: [],
  isLogin :false,
  myUser : {user_name : '' ,email :'' , prifile_url :'',bio :'',uid :''},
  users : [],
  showUsers : false,
  showSelected : false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setMessages(state, action) {
      state.messages = action.payload;
    },
    setId(state, action) {
      state.id = action.payload;
    },
    setChatList(state, action) {
      state.chatList = action.payload;
    },
    setIsLogin(state , action){
        state.isLogin = action.payload
    },
    setMyUser(state,action){
        state.myUser = action.payload
    },
    setUsers(state,action){
      state.users = action.payload
    },
    setShowUsers(state){
      state.showUsers = !state.showUsers
    },
    setShowSelected(state,action){
      state.showSelected = action.payload
    }
  },
});

export const actions = userSlice.actions;
export default userSlice.reducer;
