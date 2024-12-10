import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {EquipmentResponse, Register, User} from '../api/Api'
import { act } from 'react';

interface AuthState {
    user: Register | null;
    isAuthenticated: boolean;
    procurement_id: number;
    procurement_count: number;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    procurement_id: -1,
    procurement_count: -1
};

interface cart {
    procurement_id: number;
    procurement_count: number;
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<Register>) {
            state.user = action.payload
            state.isAuthenticated = true;
        },
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.procurement_id = -1;
            state.procurement_count = -1;
        },
        setCart(state, action: PayloadAction<EquipmentResponse>) {
            state.procurement_id = action.payload.procurement_id
            state.procurement_count = action.payload.procurement_count
        }
    },
});

export const { setUser, logout, setCart } = authSlice.actions;

export default authSlice.reducer;
