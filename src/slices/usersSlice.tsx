import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Завантажуємо деталі користувача
export const fetchUserDetail = createAsyncThunk(
    "users/fetchUserDetail",
    async (id) => {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        return response.data;
    }
);

const usersSlice = createSlice({
    name: "users",

    initialState: { list: [], detail: null, recipes: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                // @ts-ignore
                state.status = "loading";
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.detail = action.payload;
                // При отриманні даних про користувача, отримуємо також рецепти
                axios.get(`https://dummyjson.com/users/${action.payload.id}/recipes`)
                    .then((response) => {
                        state.recipes = response.data.recipes;
                    });
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                // @ts-ignore
                state.status = "failed";
            });
    }
});

export default usersSlice.reducer;
