
import { Provider } from "react-redux";
import {createRoot} from "react-dom/client";
import {store} from "./redux/Store.ts";
import {router} from "./routers/router.tsx";
import {RouterProvider} from "react-router-dom";




 createRoot(document.getElementById('root')!).
render(<Provider store={store}>
     <RouterProvider router={router} />

</Provider>)

