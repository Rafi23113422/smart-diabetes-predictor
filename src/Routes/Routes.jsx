import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../Pages/Home/Home";
import NotFound from "../Pages/NotFound";

import FullDetailsPredictionForm from "../Pages/Form/FullDetailsPredictionForm";
import SimplePrediction from "../Pages/Form/SimplePrediction";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App></App>,
        errorElement:<NotFound></NotFound>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/api/full_details_prediction',
                element:<FullDetailsPredictionForm></FullDetailsPredictionForm>
            },
            {
                path:'/api/simple_details_prediction',
                element:<SimplePrediction></SimplePrediction>
            }
        ]
    }
])

export default router