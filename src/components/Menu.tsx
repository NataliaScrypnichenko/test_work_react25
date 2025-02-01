import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {logout} from "../slices/AuthSlice.tsx";


const Menu = () => {
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    return (
        <nav>
            <ul>
                {user ? (
                    <>
                        <li><Link to="/users">Користувачі</Link></li>
                        <li><Link to="/recipes">Рецепти</Link></li>
                        <li><Link to="/profile">{user.firstName} {user.lastName}</Link></li>
                        <li><button onClick={() => dispatch(logout())}>Вийти</button></li>
                    </>
                ) : (
                    <li><Link to="/login">Увійти</Link></li>
                )}
            </ul>
        </nav>
    );
};

export default Menu;
