
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,  // Початковий стан автентифікації
    user: null,              // Початкові дані користувача
};

const authSlice = createSlice({
    name: "auth",           // Назва слайсу
    initialState,           // Початковий стан
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.user = action.payload;  // Додаємо користувача при логіні
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.user = null;  // Очищаємо користувача при логауті
        },
    },
});

export const { login, logout } = authSlice.actions;  // Імпортуємо екшн-генератори
export default authSlice.reducer;  // Експортуємо редуктор
