import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orders } from '../api/Api';

interface state {
    procurements: Orders[];
}

const initialState: state = {
    procurements: [],
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
    },
});

export const { setProcurements } = procurementsSlice.actions;

export default procurementsSlice.reducer;
