import { createSlice } from "@reduxjs/toolkit"

interface InitialState{
    loginStatus: boolean,
    userId?: string,
    pageLoadingStatus: boolean
}

const initialState: InitialState = {
    loginStatus: false,
    userId: undefined,
    pageLoadingStatus: false
}

export const userSlice = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.loginStatus = action.payload.loginStatus
            state.userId = action.payload.userId
        },
        setPageLoadingStatus: (state, action) => {
            state.pageLoadingStatus = action.payload
        }
    },
})

export const { setPageLoadingStatus, setUserStatus } = userSlice.actions;


export default userSlice.reducer