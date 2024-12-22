// src/slices/EquipmentSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Equipment } from '../api/Api';

interface EquipmentState {
  currentEquipment: Equipment | null;
}

const initialState: EquipmentState = {
  currentEquipment: null,
};

export const fetchEquipment = createAsyncThunk(
  'equipment/fetchEquipment',
  async (id: string) => {
      const { request } = await api.equipment.equipmentRead(id);
      if (request.status === 200) {
        return JSON.parse(request.response);
      }
  }
);

const equipmentSlice = createSlice({
  name: 'equipment',
  initialState,
  reducers: {
    // other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEquipment.fulfilled, (state, action) => {
        state.currentEquipment = action.payload;
      })
  },
});

export default equipmentSlice.reducer;
