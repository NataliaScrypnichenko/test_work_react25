import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useDispatch } from "react-redux";
import axios from "axios";
import { login } from "../slices/AuthSlice"; // Переконайтеся, що шлях правильний!
import { useNavigate } from "react-router-dom";

// Описуємо типи даних для форми
type LoginFormData = {
    username: string;
    password: string;
};

// Схема валідації з Joi
const schema = Joi.object({
    username: Joi.string().required().messages({
        "string.empty": "Ім'я користувача обов'язкове",
    }),
    password: Joi.string().min(4).required().messages({
        "string.empty": "Пароль обов'язковий",
        "string.min": "Пароль має містити мінімум 4 символи",
    }),
});

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: joiResolver(schema),
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Функція обробки форми
    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await axios.post("https://dummyjson.com/auth/login", {
                username: data.username,
                password: data.password,
            });

            dispatch(login(response.data)); // Передаємо дані в Redux
            localStorage.setItem("isAuthenticated", "true"); // Зберігаємо статус логіну
            navigate("/profile"); // Перенаправляємо користувача

        } catch (error) {
            console.error("Помилка логіну:", error);
            alert("Невірні дані! Спробуйте ще раз.");
        }
    };

    return (
        <div>
            <h1>Логін</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Ім'я користувача</label>
                    <input {...register("username")} />
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label>Пароль</label>
                    <input type="password" {...register("password")} />
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit">Увійти</button>
            </form>
        </div>
    );
};

export default LoginPage;



