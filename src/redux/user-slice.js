import { createSlice } from "@reduxjs/toolkit"


const initialState = {user :[{user_name : '' , bio : '' , profile_url :''}] , messages : [{}] , id :'',chatList : []}
const userSlice = createSlice({
    name : 'user',
    initialState,
    reducers :{
        setUser(state,action){
            state.user = action.payload
        },
        setMessages(state,action) {
            state.messages = action.payload
        },
        setId(state,action){
            state.id = action.payload
        },
        setChatList(state,action){
            state.chatList = action.payload
        }
    }
})

export const actions = userSlice.actions
export default userSlice.reducer