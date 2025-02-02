// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from "axios";
//
// // Завантажуємо деталі користувача
// export const fetchUserDetail = createAsyncThunk(
//     "users/fetchUserDetail",
//     async (id: number) => {  // Додано типізацію для id
//         const response = await axios.get(`https://dummyjson.com/users/${id}`);
//         return response.data;
//     }
// );
//
// const usersSlice = createSlice({
//     name: "users",
//
//     initialState: {
//         list: [],
//         detail: null,
//         recipes: [],
//         status: "idle",  // Додаємо поле status
//     },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder
//             .addCase(fetchUserDetail.pending, (state) => {
//                 state.status = "loading";
//             })
//             .addCase(fetchUserDetail.fulfilled, (state, action) => {
//                 state.detail = action.payload;
//                 // При отриманні даних про користувача, отримуємо також рецепти
//                 axios.get(`https://dummyjson.com/users/${action.payload.id}/recipes`)
//                     .then((response) => {
//                         state.recipes = response.data.recipes;
//                     });
//                 state.status = "succeeded"; // Оновлюємо статус на "succeeded"
//             })
//             .addCase(fetchUserDetail.rejected, (state) => {
//                 state.status = "failed"; // Оновлюємо статус на "failed"
//             });
//     }
// });
//
// export default usersSlice.reducer;
// usersSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Завантажуємо деталі користувача
export const fetchUserDetail = createAsyncThunk(
    "users/fetchUserDetail",
    async (id: number) => {
        const response = await axios.get(`https://dummyjson.com/users/${id}`);
        return response.data;
    }
);

const usersSlice = createSlice({
    name: "users",
    initialState: { list: [], detail: null, recipes: [], status: "idle" },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchUserDetail.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.detail = action.payload;
                // Завантажуємо рецепти для цього користувача
                axios.get(`https://dummyjson.com/users/${action.payload.id}/recipes`)
                    .then((response) => {
                        state.recipes = response.data.recipes;
                    });
            })
            .addCase(fetchUserDetail.rejected, (state) => {
                state.status = "failed";
            });
    }
});

export default usersSlice.reducer;
