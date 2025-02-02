import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../slices/AuthSlice"; // Виправлено шлях, якщо потрібно
import usersReducer from "../slices/usersSlice";
import recipesReducer from "../slices/RecipesSlice"; // Додайте імпорт для recipesReducer

export const store = configureStore({
    reducer: {
        auth: authReducer,  // Переконайтеся, що правильно підключено
        users: usersReducer,
        recipes: recipesReducer,  // Використовуйте правильну назву ред'юсера
    },
});

// Типізація RootState та AppDispatch (якщо ви використовуєте TypeScript)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
