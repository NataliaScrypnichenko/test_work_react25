import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store.ts"; // Правильний імпорт типу RootState
import "../styles/RecipeDetailPage.css";
import {fetchRecipeDetail} from "../slices/RecipesSlice.tsx";

const RecipeDetailPage = () => {
    const { id } = useParams<{ id: string }>(); // Тепер явно вказуємо тип id як string
    const dispatch = useDispatch();

    const recipe = useSelector((state: RootState) =>
        state.recipes.list ? state.recipes.list.find(recipe => recipe.id === Number(id)) : undefined
    );

    useEffect(() => {
        if (id && !recipe) {  // Перевірка наявності id та того, що рецепт не завантажено
            // @ts-ignore
            dispatch(fetchRecipeDetail(Number(id))); // Передаємо id як число
        }
    }, [dispatch, id, recipe]);

    return (
        <div className="container">
            <h1>Деталі рецепту</h1>
            {recipe ? (
                <div>
                    <h2>{recipe?.name || "Невідомий рецепт"}</h2>
                    <p><strong>Опис:</strong> {recipe?.description || "Опис відсутній"}</p>
                    <p><strong>Інгредієнти:</strong> {recipe?.ingredients?.join(", ") || "Немає інформації"}</p>
                    <p><strong>Інструкція:</strong> {recipe?.instructions || "Немає інструкції"}</p>
                    <p><strong>Теги:</strong> {recipe?.tags?.join(", ") || "Без тегів"}</p>

                    <h3>Автор рецепту</h3>
                    <Link to={`/users/${recipe?.userId}`}>Перейти до користувача</Link>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default RecipeDetailPage;
