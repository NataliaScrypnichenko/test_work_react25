import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../styles/RecipeDetailPage.css";
import {fetchRecipeDetail} from "../slices/RecipesSlice.tsx";

const RecipeDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();

    // @ts-ignore
    const recipe = useSelector(state => state.recipes.list.find(recipes => recipes.id === parseInt(id)));

    useEffect(() => {
        if (!recipe) {
            // @ts-ignore
            dispatch(fetchRecipeDetail(id)); // Завантажуємо рецепт по ID
        }
    }, [dispatch, id, recipe]);

    return (
        <div className="container">
            <h1>Деталі рецепту</h1>
            {recipe ? (
                <div>
                    <h2>{recipe.name}</h2>
                    <p><strong>Опис:</strong> {recipe.description}</p>
                    <p><strong>Інгредієнти:</strong> {recipe.ingredients.join(", ")}</p>
                    <p><strong>Інструкція:</strong> {recipe.instructions}</p>
                    <p><strong>Теги:</strong> {recipe.tags.join(", ")}</p>

                    <h3>Автор рецепту</h3>
                    <Link to={`/users/${recipe.userId}`}>Перейти до користувача</Link>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default RecipeDetailPage;
