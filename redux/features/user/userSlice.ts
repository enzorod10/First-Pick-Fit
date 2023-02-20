import { createSlice } from "@reduxjs/toolkit"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/clientApp"
import { store } from "../../../store"

interface InitialState{
    loginStatus: boolean,
    userId?: string
}

const initialState: InitialState = {
    loginStatus: false,
    userId: undefined
}

export const userSlice = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.loginStatus = action.payload.loginStatus
            state.userId = action.payload.userId
        }
    },
    // extraReducers: (builder.addMutation()){

    // }
})

export default userSlice.reducer