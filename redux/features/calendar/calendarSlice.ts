import { createSlice } from "@reduxjs/toolkit"
import { store } from "../../../store"

interface InitialState{
    monthAndYear: string,
    spacedMonthAndYear: string,
    dateClicked: number | null,
    monthSelected: number | null,
    calendarExpanded: boolean
} 

const initialState: InitialState = {
    monthAndYear: '',
    spacedMonthAndYear: '',
    dateClicked: null,
    monthSelected: null,
    calendarExpanded: true
}

export const calendarSlice = createSlice({
    name: 'calendarStatus',
    initialState,
    reducers: {
        setMonthAndYear: (state, action) => {
            state.monthAndYear = action.payload.monthAndYear
            state.spacedMonthAndYear = action.payload.spacedMonthAndYear
            state.monthSelected = action.payload.monthSelected
        },
        setDateClicked: (state, action) => {
            state.dateClicked = action.payload
        },
        setIsCalendarExpanded: (state, action) => {
            state.calendarExpanded = action.payload
        }
    },
})

export const { setMonthAndYear, setDateClicked, setIsCalendarExpanded } = calendarSlice.actions;

export default calendarSlice.reducer