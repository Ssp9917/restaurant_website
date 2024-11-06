import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import { Login, Signup } from "../components";
import Home from "../pages/user/Home";
import Cart from "../pages/user/Cart";
import AdminMain from "../layout/AdminMain";
import Dashboard from "../pages/admin/Dashboard";
import Categories from "../pages/admin/Categories";
import Recipe from "../pages/admin/Recipe";
import AddRecipe from "../pages/admin/AddRecipe";
import AddCategory from "../pages/admin/AddCategory";
import SingleRecipeDetails from "../pages/admin/SingleRecipeDetails";
import ThankyouPage from "../components/ThankyouPage";
import AddRestaurant from "../components/AddRestaurant";
import Banners from "../pages/admin/Banners";
import AddBanner from "../pages/admin/addBanner";
import Order from "../pages/user/Order";
import Orders from "../pages/admin/Orders";
import ViewSingleOrder from "../pages/admin/ViewSingleOrder";
import About from "../pages/user/About";
import Contact from "../pages/user/Contact";
import EditCategory from "../pages/admin/EditCategory";
import EditRecipe from "../pages/admin/EditRecipe";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path:'/menu/:id',
        element:<SingleRecipeDetails/>
      },
      {
        path: "/login",
        element: <Login />
      },
      {
        path: "/signup",
        element: <Signup />
      },
      {
        path:"/success",
        element:<ThankyouPage/>
      },
      {
        path:"/order",
        element:<Order/>
      },
      {
        path:"/about",
        element:<About/>
      },
      {
        path:"/contact",
        element:<Contact/>
      }
    ]
  },
  {
    path: "/admin",
    element: <AdminMain />,
    children: [
      {
        path: "",
        element: <Dashboard />
      },
      {
        path: "categories",
        element: <Categories />
      },
      {
        path: "recipe",
        element: <Recipe />
      },
      {
        path: "recipe/addRecipe",
        element: <AddRecipe />
      },
      {
        path:'recipe/editRecipe/:recipeId',
        element:<EditRecipe/>
      },
      {
        path:"category/addCategory",
        element:<AddCategory/>
      },
      {
        path:"category/editCategory/:categoryId",
        element:<EditCategory/>
      },
      // {
      //   path:"restaurant/addRestaurant",
      //   element:<AddRestaurant/>
      // }
      {
        path:"banner",
        element:<Banners/>
      },
      {
        path:"banner/addBanner",
        element:<AddBanner/>
      },
      {
        path:"order",
        element:<Orders/>
      },
      {
        path:"order/:orderId",
        element:<ViewSingleOrder/>
      }
    ]
  },
]);

export default router;