import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { fetchRecipes, setPage } from '../redux/recipesSlice';
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Search from "../components/Search";

const RecipesPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { list, page, status, search, tag } = useSelector(state => state.recipes);

    useEffect(() => {
        dispatch(fetchRecipes({ page, search, tag }));
    }, [dispatch, page, search, tag]);


    return (
        <div>
            <Menu />
            <h1>Рецепти</h1>
            <Search />

            {status === "loading" && <p>Завантаження...</p>}
            {status === "failed" && <p>Помилка завантаження</p>}

            <ul>
                {/*// @ts-ignore*/}
                {list.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={`/recipes/${recipe.id}`}>
                            <h3>{recipe.name}</h3>
                        </Link>
                    </li>
                ))}
            </ul>

            <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
                Назад
            </button>
            <span>Сторінка {page}</span>
            <button onClick={() => dispatch(setPage(page + 1))}>Далі</button>
        </div>
    );
};

export default RecipesPage;
