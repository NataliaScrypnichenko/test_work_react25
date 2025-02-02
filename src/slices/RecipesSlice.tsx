import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
// Тип для рецепту
interface Recipe {
    id: number;
    name: string;
    description: string;
    ingredients?: string[];
    instructions: string;
    tags?: string[];
    userId: number;
}

// Тип для стану
interface RecipesState {
    list: Recipe[];
    status: "idle" | "loading" | "succeeded" | "failed";
    page: number;
    search: string;
    tag: string;
}

// Завантажуємо деталі рецепту
export const fetchRecipeDetail = createAsyncThunk<Recipe, number>(
    "recipes/fetchRecipeDetail",
    async (id) => {
        const response = await axios.get(`https://dummyjson.com/recipes/${id}`);
        return response.data;
    }
);

const initialState: RecipesState = {
    list: [],
    status: "idle",
    page: 1,
    search: "",
    tag: "",
};

export const recipesSlice = createSlice({
    name: "recipes",
    initialState,
    reducers: {
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        },
        setTag: (state, action: PayloadAction<string>) => {
            state.tag = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecipeDetail.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchRecipeDetail.fulfilled, (state, action: PayloadAction<Recipe>) => {
                if (action.payload) {  // Перевіряємо, що payload існує
                    const recipeExists = state.list.find((recipe) => recipe.id === action.payload.id);
                    if (!recipeExists) {
                        state.list.push(action.payload);
                    }
                }
                state.status = "succeeded";
            })
            .addCase(fetchRecipeDetail.rejected, (state) => {
                state.status = "failed";
            });
    },
});

export default recipesSlice.reducer;
export const { setPage, setSearch, setTag } = recipesSlice.actions;




