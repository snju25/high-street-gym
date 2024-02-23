import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';

const initialState = {
    user: JSON.parse(localStorage.getItem("userState")) || null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        loginUser: (state,action)=>{
            state.user = {...action.payload}
            localStorage.setItem("userState",JSON.stringify(state))
            return state
            
        },
        logoutUser: (state)=>{
            state.user = null;
            localStorage.removeItem('userState');
            toast.success('Logged out successfully');
        },
        editUser: (state,action) =>{
            console.log("edit user")
        }
    }
})

export const {loginUser,logoutUser, editUser} = userSlice.actions

export default userSlice.reducer