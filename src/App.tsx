import { Outlet } from "react-router-dom";
import Menu from "./components/Menu";

const App = () => {
    return (
        <div>
            <Menu/>
            <Outlet/> {/* Тут відображаються вкладені сторінки */}
        </div>
    );
};

export default App;
