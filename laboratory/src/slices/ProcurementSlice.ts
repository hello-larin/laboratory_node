// src/slices/ProcurementsSlice.ts
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../api';
import { Procurement } from '../api/Api';

interface ProcurementState {
    procurement: Procurement | null;
}

const initialState: ProcurementState = {
    procurement: null,
};

export const fetchProcurement = createAsyncThunk(
  'procurements/fetchProcurement',
  async (id: string) => {
      const { request } = await api.procurements.procurementsRead(id);
      if (request.status === 200) {
        return JSON.parse(request.response);
      } 
  }
);

const procurementsSlice = createSlice({
  name: 'procurement',
  initialState,
  reducers: {
    // other reducers
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcurement.fulfilled, (state, action) => {
        state.procurement = action.payload;
      })
  },
});

export default procurementsSlice.reducer;
