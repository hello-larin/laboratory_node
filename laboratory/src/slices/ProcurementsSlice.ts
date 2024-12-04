import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Orders } from '../api/Api';

const initialState: Orders[] = [];

const procurementsSlice = createSlice({
    name: 'procurements',
    initialState,
    reducers: {
        setProcurements(state, action: PayloadAction<Orders[]>) {
            console.log("ENETERED")
            return action.payload;
        },
    },
});

export const { setProcurements } = procurementsSlice.actions;

export default procurementsSlice.reducer;
