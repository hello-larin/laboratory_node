import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { EquipmentResult } from "../modules/EquipmentApi";

interface filterCatalog {
    searchValue: string,
    catalog: EquipmentResult
}

const initialState: filterCatalog = {
    searchValue: '',
    catalog: {
        procurement_id: -1,
	    procurement_count: 0,
        equipment: []
    },
};

const catalogSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCatalog(state, action: PayloadAction<EquipmentResult>) {
            state.catalog = action.payload;
        },
    },
});

export const { setSearchValue, setCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;