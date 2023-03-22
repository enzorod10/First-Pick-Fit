import { createSlice } from "@reduxjs/toolkit";
import Program from '../../../interfaces/Program';

interface InitialState{
    monthAndYear: string,
    spacedMonthAndYear: string,
    dateClicked: number | null,
    dateClickedForProgram: number | null,
    programSelected: Program | null, 
    monthSelected: number | null,
    calendarExpanded: boolean
    selectingProgramStatus: boolean
} 

const initialState: InitialState = {
    monthAndYear: '',
    spacedMonthAndYear: '',
    dateClicked: null,
    dateClickedForProgram: null,
    monthSelected: null,
    calendarExpanded: true,
    programSelected: null, 
    selectingProgramStatus: false
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
        setDateClickedForProgram: (state, action) => {
            state.dateClickedForProgram = action.payload
        },
        setIsCalendarExpanded: (state, action) => {
            state.calendarExpanded = action.payload
        },
        setProgramSelected: (state, action) => {
            state.programSelected = action.payload
        },
        setSelectingProgramStatus: (state, action) => {
            state.selectingProgramStatus = action.payload;
        } 
    },
})

export const { setMonthAndYear, setDateClicked, setIsCalendarExpanded, setSelectingProgramStatus, setProgramSelected, setDateClickedForProgram } = calendarSlice.actions;

export default calendarSlice.reducer