import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Equipment } from "../api/Api";
import { api } from "../api";

export const fetchEquipmentList = createAsyncThunk<Equipment[], void>(
    'catalog/fetchEquipmentList',
    async () => {
        const { request } = await api.equipment.equipmentList();
        if (request.status === 200) {
          return JSON.parse(request.response).equipment;
        } 
    }
  );
  
  // Thunk для поиска оборудования
  export const searchEquipment = createAsyncThunk<Equipment[], string>(
    'catalog/searchEquipment',
    async (searchValue) => {
    
        const { request } = await api.equipment.equipmentList({ price: +searchValue });
        if (request.status === 200) {
          return JSON.parse(request.response).equipment;
        } 
    }
  );
  
  // Thunk для добавления оборудования в корзину
  export const addEquipmentToCart = createAsyncThunk<void, number, { rejectValue: string }>(
    'catalog/addEquipmentToCart',
    async (id) => {
        const { request } = await api.equipment.equipmentAddCreate(id.toString(), { amount: 1 });
        if (request.status === 200) {
          return;
        }
    }
  );

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
    extraReducers: (builder) => {
        builder
          .addCase(fetchEquipmentList.fulfilled, (state, action: PayloadAction<Equipment[]>) => {
            state.catalog = action.payload;
          })
          .addCase(searchEquipment.fulfilled, (state, action: PayloadAction<Equipment[]>) => {
            state.catalog = action.payload;
          })
          .addCase(addEquipmentToCart.fulfilled, () => {
          })
      },
});

export const { setSearchValue, setCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;