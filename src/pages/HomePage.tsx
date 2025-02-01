import { Link } from "react-router-dom";

const HomePage = () => {
    return (
        <div>
            <h1>Потрібно аутентифікуватись</h1>
            <Link to="/login">
                <button>Увійти</button>
            </Link>
        </div>
    );
};

export default HomePage;
