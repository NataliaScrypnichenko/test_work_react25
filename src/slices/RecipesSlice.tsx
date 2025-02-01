
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

// Завантажуємо деталі рецепту
export const fetchRecipeDetail = createAsyncThunk(
    "recipes/fetchRecipeDetail",
    async (id) => {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        return response.data;
    }
);

 export const recipesSlice = createSlice({
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipeDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRecipeDetail.fulfilled, (state, action) => {
                // Додаємо або оновлюємо рецепт
                // @ts-ignore
                const recipeExists = state.list.find(r => r.id === action.payload.id);
                if (!recipeExists) {
                    const {payload} = action;
                    // @ts-ignore
                    state.list.push(payload);
                }
                state.status = "succeeded";
            })
            .addCase(fetchRecipeDetail.rejected, (state) => {
                state.status = "failed";
            });
    },
    initialState: {list: [], status: "idle", page: 1, search: "", tag: ""},
    name: "recipes",
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
        setSearch: (state, action) => {
            state.search = action.payload;
        },
        setTag: (state, action) => {
            state.tag = action.payload;
        }
    }
});
export default recipesSlice.reducer;
export const { setPage, setSearch, setTag } = recipesSlice.actions;


