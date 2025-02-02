
import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/Store.ts"; // Імпортуємо правильний тип
import { fetchUserDetail } from "../slices/usersSlice.tsx";
import './UserDetailPage.css'
import "../styles/UserDetailPage.css";

// Типізація для користувача
interface User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phone: string;
    company: string;
    dob: string;
}

// Типізація для рецепту
interface Recipe {
    id: number;
    name: string;
}

const UserDetailPage = () => {
    const { id } = useParams<{ id: string }>();  // id є рядком
    const dispatch = useDispatch();

    // Типізуємо selector через RootState
    const user = useSelector((state: RootState) => state.users.detail) as User | null;
    const recipes = useSelector((state: RootState) => state.users.recipes) as Recipe[];
    const status = useSelector((state: RootState) => state.users.status); // Додаємо статус завантаження

    useEffect(() => {
        if (id) {
            const numericId = Number(id); // Конвертуємо id у число
            if (!isNaN(numericId)) {
                // @ts-ignore
                dispatch(fetchUserDetail(numericId)); // Завантажуємо дані користувача
            } else {
                console.error('Невірний ID');
            }
        }
    }, [dispatch, id]);

    return (
        <div className="container">
            <h1>Деталі користувача</h1>
            {status === "loading" && <p>Завантаження...</p>}
            {status === "failed" && <p>Помилка завантаження</p>}
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
                        {recipes?.map((recipe) => (
                            <li key={recipe.id}>
                                <Link to={`/recipes/${recipe.id}`}>
                                    {recipe.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Завантаження...</p>
            )}
        </div>
    );
};

export default UserDetailPage;
