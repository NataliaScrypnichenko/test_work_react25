
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice.tsx";
// @ts-ignore
import recipesReducer from "../slices/RecipesSlice.tsx";
import usersReducer from "../slices/usersSlice.tsx";
export const store = configureStore({
    reducer: {
        auth: authReducer,
        recipes: recipesReducer,  // Підключаємо usersReducer тут
        users: usersReducer,
    }
});

