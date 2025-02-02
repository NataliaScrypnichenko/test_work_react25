import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import {store} from "./redux/Store.ts";
import {router} from "./routers/router.tsx";


const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
);
