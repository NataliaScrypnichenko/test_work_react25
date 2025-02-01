
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import Joi from "joi";
import { useDispatch } from "react-redux";
import axios from "axios";
import {login} from "../slices/AuthSlice.tsx";
import { useNavigate} from "react-router-dom";

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
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(schema),
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // @ts-ignore
    const onSubmit = async (data):Promise<void> => {
        try {
            const response = await axios.post("https://dummyjson.com/auth/login", {
                username: data.username,
                password: data.password,
            });

            dispatch(login(response.data));
            navigate("/profile");
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            alert("Невірні дані! Спробуйте ще раз.");
        }
    };

    // @ts-ignore
    return (
        <div>
            <h1>Логін</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Ім'я користувача</label>
                    <input {...register("username")} />
                    {/*// @ts-ignore*/}
                    {errors.username && <p>{errors.username.message}</p>}
                </div>

                <div>
                    <label>Пароль</label>
                    <input type="password" {...register("password")} />
                    {/*// @ts-ignore*/}
                    {errors.password && <p>{errors.password.message}</p>}
                </div>

                <button type="submit">Увійти</button>
            </form>
        </div>
    );
};

export default LoginPage;


