import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import DetailsPage from "../pages/DetailPage/DetailsPage";
import IndexPage from "../pages/IndexPage/IndexPage";
import Template from "../shared/Template/Template";

const MainRouter = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Template title="Action Plan"><IndexPage/></Template>,
        },
        {
            path: "/create",
            element: <Template title="Create Plan"><DetailsPage/></Template>,
        },
        {
            path: "/edit/:id",
            element: <Template title="Modify Plan"><DetailsPage/></Template>,
        }
    ]);

    return (
        <RouterProvider router={router} />
    )
}

export default MainRouter