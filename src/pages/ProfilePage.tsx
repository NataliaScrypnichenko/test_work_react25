import { useSelector, useDispatch } from "react-redux";
import { logout } from "../slices/AuthSlice.tsx";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
    // @ts-ignore
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    return (
        <div>
            <h1>Привіт, {user?.username}!</h1>
            <p>Email: {user?.email}</p>
            <p>Токен: {user?.token}</p>
            <button onClick={handleLogout}>Вийти</button>
        </div>
    );
};

export default ProfilePage;
