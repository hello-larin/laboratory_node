import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Items, Procurement } from '../api/Api';

interface state {
    procurement: Procurement | null;
}

const initialState: state = {
    procurement: null,
}

const procurementSlice = createSlice({
    name: 'procurement',
    initialState,
    reducers: {
        setProcurement(state, action: PayloadAction<Procurement>) {
            state.procurement = JSON.parse(action.payload);
        },
        setItems(state, action: PayloadAction<Items>) {
            state.procurement.equipment = action.payload
        },
        updateItem(state, action: PayloadAction<Items>) {
            const update_item : Items = action.payload;
            state.procurement.equipment = state.procurement.equipment.map(item =>
              item.name === update_item.name ? { update_item } : item
            );
        },
        clear: (state) => {
            state.procurement = null;
          },
    },
});

export const { setProcurement, setItems, updateItem } = procurementSlice.actions;

export default procurementSlice.reducer;
