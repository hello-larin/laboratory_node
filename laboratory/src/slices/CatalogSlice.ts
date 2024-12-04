import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Equipment } from "../api/Api";

interface filterCatalog {
    searchValue: string,
    catalog: Equipment[]
}

const initialState: filterCatalog = {
    searchValue: '',
    catalog: [],
};

const catalogSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setCatalog(state, action: PayloadAction<Equipment[]>) {
            state.catalog = action.payload;
        },
    },
});

export const { setSearchValue, setCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;