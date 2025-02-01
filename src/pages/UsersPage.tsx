import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UsersPage = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/users?limit=30&skip=${(page - 1) * 30}`);
                setUsers(response.data.users);
            } catch (error) {
                console.error("Помилка завантаження користувачів:", error);
            }
        };

        fetchUsers();
    }, [page]);

    return (
        <div>
            <h1>Список користувачів</h1>
            <ul>
                {users.map(user => (
                    <li key={user["id"]}>
                        <Link to={`/users/${user["id"]}`}>
                            {user["firstName"]} {user["lastName"]}
                        </Link>
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage(page + 1)}>Далі</button>
        </div>
    );
};

export default UsersPage;
