import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Equipment, EquipmentResponse } from "../api/Api";
import { api } from "../api";

export const fetchEquipmentList = createAsyncThunk<EquipmentResponse, void>(
    'catalog/fetchEquipmentList',
    async () => {
        const { request } = await api.equipment.equipmentList();
        if (request.status === 200) {
          return JSON.parse(request.response);
        } 
    }
  );
  
  // Thunk для поиска оборудования
  export const searchEquipment = createAsyncThunk<EquipmentResponse, string>(
    'catalog/searchEquipment',
    async (searchValue) => {
        if (searchValue !== ''){
          const { request } = await api.equipment.equipmentList({ price: +searchValue });
          if (request.status === 200) {
            return JSON.parse(request.response);
          } 
        } else {
          const { request } = await api.equipment.equipmentList();
          if (request.status === 200) {
            return JSON.parse(request.response);
          } 
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
    catalog: Equipment[],
    procurement_count: number,
    procurement_id: number,
}

const initialState: filterCatalog = {
    searchValue: '',
    catalog: [],
    procurement_count: -1,
    procurement_id: -1,
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
          .addCase(fetchEquipmentList.fulfilled, (state, action: PayloadAction<EquipmentResponse>) => {
            state.catalog = action.payload.equipment;
            state.procurement_count = action.payload.procurement_count;
            state.procurement_id = action.payload.procurement_id;
          })
          .addCase(searchEquipment.fulfilled, (state, action: PayloadAction<EquipmentResponse>) => {
            state.catalog = action.payload.equipment;
            state.procurement_count = action.payload.procurement_count;
            state.procurement_id = action.payload.procurement_id;
          })
          .addCase(addEquipmentToCart.fulfilled, () => {
          })
      },
});

export const { setSearchValue, setCatalog } = catalogSlice.actions;

export default catalogSlice.reducer;