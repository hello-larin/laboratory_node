import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orders } from '../api/Api';

interface state {
    procurements: Orders[];
    date_start: string;
    date_end: string;
    status: string;
}

const initialState: state = {
    procurements: [],
    date_start: '',
    date_end: '',
    status: '',
}

const procurementsSlice = createSlice({
    name: 'procurements',
    initialState,
    reducers: {
        setProcurements(state, action: PayloadAction<Orders[]>) {
            console.log("ENETERED")
            state.procurements = action.payload;
        },
        clearCards: (state) => {
            state.procurements = [];
        },
        setStartDate(state, action: PayloadAction<string>) {
            console.log("StartDate")
            console.log(action.payload)
            state.date_start = action.payload
        },
        setEndDate(state, action: PayloadAction<string>) {
            state.date_end = action.payload
        },
        setStatus(state, action: PayloadAction<string>) {
            console.log("Status")
            console.log(action.payload, typeof(action.payload))
            state.status = action.payload
        },
    },
});

export const { setProcurements, clearCards, setStartDate, setEndDate, setStatus } = procurementsSlice.actions;

export default procurementsSlice.reducer;
