// import { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Link } from "react-router-dom";
// import Menu from "../components/Menu";
// import Search from "../components/Search";
// import {setPage} from "../slices/RecipesSlice.tsx";
//
// const RecipesPage = () => {
//     const dispatch = useDispatch();
//
//     const { list, page, status, search, tag } = useSelector(state => state.recipes);
//
//     useEffect(() => {
//         dispatch(fetchRecipes({ page, search, tag }));
//     }, [dispatch, page, search, tag]);
//
//
//     return (
//         <div>
//             <Menu />
//             <h1>Рецепти</h1>
//             <Search />
//
//             {status === "loading" && <p>Завантаження...</p>}
//             {status === "failed" && <p>Помилка завантаження</p>}
//
//             <ul>
//
//                 {list.map(recipe => (
//                     <li key={recipe.id}>
//                         <Link to={`/recipes/${recipe.id}`}>
//                             <h3>{recipe.name}</h3>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//
//             <button onClick={() => dispatch(setPage(page - 1))} disabled={page === 1}>
//                 Назад
//             </button>
//             <span>Сторінка {page}</span>
//             <button onClick={() => dispatch(setPage(page + 1))}>Далі</button>
//         </div>
//     );
// };
//
// export default RecipesPage;

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Menu from "../components/Menu";
import Search from "../components/Search";
import { setPage } from "../slices/RecipesSlice.tsx";
 // @ts-ignore
import { fetchRecipes } from "../slices/RecipesSlice.tsx";  // Імпортуємо fetchRecipes

const RecipesPage = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const { list, page, status, search, tag } = useSelector((state) => state.recipes);

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
                {list.map((recipe) => (
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

