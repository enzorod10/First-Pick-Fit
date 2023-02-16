import { createSlice } from "@reduxjs/toolkit"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../firebase/clientApp"
import { store } from "../../../store"

interface InitialState{
    loginStatus: boolean,
    userId?: number
}

const initialState: InitialState= {
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
    }
})

onAuthStateChanged(auth, (user) => {
    if (user){
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: true, userId: user.uid}))
    } else {
        store.dispatch(userSlice.actions.setUserStatus({ loginStatus: false } ))
    }
  })

export default userSlice.reducer