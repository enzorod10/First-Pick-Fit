import { createSlice } from "@reduxjs/toolkit"
import { start } from "repl";

interface InitialState{
    loginStatus: boolean,
    userId?: string,
    pageLoadingStatus: boolean,
    search: { type: null | string, value: string},
    clickedOnButton: boolean,
    hideSearchBar: boolean
}

const initialState: InitialState = {
    loginStatus: false,
    userId: undefined,
    pageLoadingStatus: false,
    search: { type: null, value: ''},
    clickedOnButton: false,
    hideSearchBar: false
}

export const userSlice = createSlice({
    name: 'userStatus',
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.loginStatus = action.payload.loginStatus;
            state.userId = action.payload.userId;
        },
        setPageLoadingStatus: (state, action) => {
            state.pageLoadingStatus = action.payload;
        },
        setSearchedItems: (state, action) => {
            state.search.value = action.payload.value;
            if (action.payload.value === ''){
                state.search.type = null;
            } else {
            state.search.type = action.payload.type;
            }
        },
        setClickedOnButton: (state, action) => {
            state.clickedOnButton = action.payload
        },
        setHideSearchBar: (state, action) => {
            state.hideSearchBar = action.payload
        }
    },
})

export const { setPageLoadingStatus, setUserStatus, setSearchedItems, setClickedOnButton , setHideSearchBar} = userSlice.actions;


export default userSlice.reducer