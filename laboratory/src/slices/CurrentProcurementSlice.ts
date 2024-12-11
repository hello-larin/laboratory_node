import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface state {
    address: string;
    phone: string;
    
}

const initialState: state = {
    address: '',
    phone: ''
}

const currentProcurementslice = createSlice({
    name: 'currentProcurement',
    initialState,
    reducers: {
        setAddress(state, action: PayloadAction<string>) {
            state.address = action.payload;
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        clear: (state) => {
            state.address = '';
            state.phone = ''
          },
    },
});

export const { setAddress, setPhone, clear } = currentProcurementslice.actions;

export default currentProcurementslice.reducer;
