import {createBrowserRouter, Navigate} from "react-router-dom";
import HomePage from "../pages/HomePage.tsx";
import LoginPage from "../pages/LoginPage.tsx";
import ProfilePage from "../pages/ProfilePage.tsx";
import UsersPage from "../pages/UsersPage.tsx";
import UserDetailsPage from "../pages/UserDetailsPage.tsx";
import RecipeDetailsPage from "../pages/RecipeDetailsPage.tsx";
import RecipesPage from "../pages/RecipesPage.tsx";
import App from "../App.tsx";


// @ts-ignore
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true"; // Для простоти, перевірка в localStorage
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return children;
};

export const router = createBrowserRouter([
    {path:'',element:<App/>, children:[
            { path: "/", element: <HomePage /> },
            { path: "/login", element:<ProtectedRoute><LoginPage /></ProtectedRoute>  },
            {path: "/profile", element: <ProtectedRoute><ProfilePage /></ProtectedRoute>},
            {path: "/users", element: <UsersPage />},
            {path: "/users/:id", element: <UserDetailsPage />},
            {path: "/recipes", element: <RecipesPage />},
            { path: "/recipes/:id", element: <RecipeDetailsPage /> },
        ]}

]);