import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentResponse, Register } from '../api/Api'

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
            if (action.payload.procurement_id != null)
                state.procurement_id = action.payload.procurement_id
            else
                state.procurement_id = -1;
            if (action.payload.procurement_count != null)
                state.procurement_count = action.payload.procurement_count
            else
                state.procurement_count = -1;
        },
        clear: (state) => {
            state.procurement_count = -1;
            state.procurement_id = -1;
        },
        clearCart: (state) => {
            state.user = null;
            state.isAuthenticated = false;
            state.procurement_id = -1;
            state.procurement_count = -1;
        },
    },
});

export const { setUser, logout, setCart, clear, clearCart } = authSlice.actions;

export default authSlice.reducer;
