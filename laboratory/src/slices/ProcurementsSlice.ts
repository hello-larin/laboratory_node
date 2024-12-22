// src/slices/ProcurementsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import { Orders } from '../api/Api';

interface ProcurementState {
  procurements: Orders[];
  date_start: string;
  date_end: string;
  status: string;
}

const initialState: ProcurementState = {
  procurements: [],
  date_start: '',
  date_end: '',
  status: ''
};

export const fetchProcurements = createAsyncThunk(
  'procurements/fetchProcurements',
  async () => {
      const { request } = await api.procurements.procurementsList();
      if (request.status === 200) {
        return JSON.parse(request.response);
      }
  }
);

export const filterProcurements = createAsyncThunk(
  'procurements/filterProcurements',
  async ({ start_date, end_date, status }: { start_date: string, end_date: string, status: string }) => {
      const { request } = await api.procurements.procurementsList({
        start_date,
        end_date,
        status: parseInt(status, 10),
      });
      if (request.status === 200) {
        return JSON.parse(request.response);
      } 
  }
);

const procurementsSlice = createSlice({
  name: 'procurements',
  initialState,
  reducers: {
    setProcurements(state, action: PayloadAction<Orders[]>) {
      state.procurements = action.payload;
    },
    clearCards: (state) => {
      state.procurements = [];
    },
    setStartDate(state, action: PayloadAction<string>) {
      state.date_start = action.payload;
    },
    setEndDate(state, action: PayloadAction<string>) {
      state.date_end = action.payload;
    },
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProcurements.fulfilled, (state, action) => {
        state.procurements = action.payload;
      })
      .addCase(filterProcurements.fulfilled, (state, action) => {
        state.loading = false;
        state.procurements = action.payload;
      });
  },
});

export const { setProcurements, clearCards, setStartDate, setEndDate, setStatus } = procurementsSlice.actions;

export default procurementsSlice.reducer;
