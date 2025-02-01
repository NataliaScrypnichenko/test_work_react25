import { Link } from "react-router-dom";
import { useSelector} from "react-redux";

const Navbar = () => {
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const {user} = useSelector((state) => state.auth);

    return (
        <nav>

                <ul>
                    <li><Link to="/users">Користувачі</Link></li>
                    <li><Link to="/recipes">Рецепти</Link></li>
                    <li><Link to="/profile">Профіль</Link></li>
                </ul>


        </nav>
    );
};

export default Navbar;
