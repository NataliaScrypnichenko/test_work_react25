import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { Link } from "react-router-dom";
import "../styles/UserDetailPage.css";
import {fetchUserDetail} from "../slices/usersSlice.tsx";


const UserDetailPage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.users.detail);
    // @ts-ignore
    const recipes = useSelector(state => state.users.recipes);
    // const usersList = useSelector((state) => state.users.list);
     // console.log(usersList);
    useEffect(() => {
        // @ts-ignore
        dispatch(fetchUserDetail(id)); // Завантажуємо дані користувача
    }, [dispatch, id]);

    return (
        <div className="container">
            <h1>Деталі користувача</h1>
            {user ? (
                <div>
                    <p><strong>Ім'я:</strong> {user.firstName}</p>
                    <p><strong>Прізвище:</strong> {user.lastName}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Адреса:</strong> {user.address}</p>
                    <p><strong>Телефон:</strong> {user.phone}</p>
                    <p><strong>Компанія:</strong> {user.company}</p>
                    <p><strong>Дата народження:</strong> {user.dob}</p>

                    <h2>Рецепти користувача</h2>
                    <ul>
                        {/*// @ts-ignore*/}
                        {recipes.map(function (recipe) {
                            return <li key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`}>
                                    {recipe.name}
                                </Link>
                            </li>;
                        })}
                    </ul>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default UserDetailPage;
