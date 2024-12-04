import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Items, Orders, Procurement } from '../api/Api';


const initialState: Orders | null = null;

const procurementSlice = createSlice({
    name: 'procurement',
    initialState,
    reducers: {
        setProcurement(state, action: PayloadAction<Procurement>) {
            return action.payload;
        },
        setItems(state, action: PayloadAction<Items>) {
            state.equipment = action.payload
        }
    },
});

export const { setProcurement, setItems } = procurementSlice.actions;

export default procurementSlice.reducer;
