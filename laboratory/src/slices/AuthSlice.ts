import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EquipmentResponse, Register } from '../api/Api'
import { api } from '../api';

// Thunk для логина
export const loginUser = createAsyncThunk<Register, {username: string, password: string}>(
    'auth/loginUser',
    async ({ username, password }) => {
            const response = await api.login.loginCreate({ username, password });
            if (response.request.status === 200) {
                return JSON.parse(response.request.response);
            }
    }
);

// Thunk для получения списка оборудования
export const fetchCartInfo = createAsyncThunk(
    'auth/getCartInformation',
    async () => {
        const response = await api.equipment.equipmentList();
        if (response.request.status === 200) {
            return JSON.parse(response.request.response);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async () => {
        const { request } = await api.logout.logoutCreate();
        if (request.status === 200) {
          return;
        }
    }
  );

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
        logout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.procurement_id = -1;
            state.procurement_count = -1;
        },
        setCartCount(state, action: PayloadAction<number>) {
            state.procurement_count = action.payload;
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
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(fetchCartInfo.fulfilled, (state, action) => {
                state.procurement_id = action.payload.procurement_id || -1;
                state.procurement_count = action.payload.procurement_count || -1;
            })
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.procurement_id = -1;
                state.procurement_count = -1;
              })
    },
});

export const { setUser, logout, setCart, clear, clearCart, setCartCount } = authSlice.actions;

export default authSlice.reducer;
