//
// import { useSelector, useDispatch } from "react-redux";
// import { logout } from "../slices/AuthSlice";
// import { useNavigate } from "react-router-dom";
// import {RootState} from "../redux/Store.ts";
//
// const ProfilePage = () => {
//     const { user } = useSelector((state: RootState) => state.auth);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();
//
//     const handleLogout = () => {
//         dispatch(logout());
//         localStorage.removeItem("isAuthenticated"); // Очищення статусу логіну
//         navigate("/");
//     };
//
//     return (
//         <div>
//             <h1>Привіт, {user?.username}!</h1>
//             <p>Email: {user?.email}</p>
//             <p>Токен: {user?.token}</p>
//             <button onClick={handleLogout}>Вийти</button>
//         </div>
//     );
// };
//
// export default ProfilePage;

import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/AuthSlice";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/Store.ts";

const ProfilePage = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        localStorage.removeItem("isAuthenticated"); // Очищення статусу логіну
        navigate("/");
    };

    // Додаємо перевірку, якщо користувач не залогінений
    if (!user) {
        return <p>Будь ласка, увійдіть у систему.</p>;
    }

    return (
        <div>
            <h1>Привіт, {user.username}!</h1>
            <p>Email: {user.email}</p>
            <p>Токен: {user.token}</p>
            <button onClick={handleLogout}>Вийти</button>
        </div>
    );
};

export default ProfilePage;

