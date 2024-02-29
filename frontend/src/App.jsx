import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Bookings, Calender, Dashboard, HomeLayout, ImportXML, Login, Profile, Register,Blog,Error,CreateBooking, SingleBlogPage} from "./pages";
import {action as loginAction } from "./pages/Login"
import {action as registerAction } from "./pages/Register"
import {action as blogAction } from "./pages/Blog"
import {loader as blogLoader } from "./pages/Blog"
import AuthRoute from "./components/AuthRoute"
import ErrorElement from "./components/ErrorElement";
import store from "./store";



const router = createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <AuthRoute><Dashboard /></AuthRoute>,
        errorElement: <ErrorElement/>
      },
      // read and delete the bookings here ..............//
      {
        path: "/bookings",
        element: <Bookings />,
        errorElement: <ErrorElement/>,
      },
      // not sure ...............................................//
      // create booking here...................................//
      {
        path:"/createBooking",
        element:<CreateBooking/>,
        errorElement:<ErrorElement/>
      },
      // display classes here........................//
      {
        path: "/calender",
        element: <Calender />,
        errorElement: <ErrorElement/>
      },
      // Create blog post and read all blog post here............. with title.../////
      {
        path: "/blog",
        element: <Blog />,
        errorElement:<ErrorElement/>,
        action: blogAction(store),
        loader: blogLoader,
      },
      // Single blog post read page............//
      {
        path: "/blog/:id",
        element: <SingleBlogPage />,
        errorElement:<ErrorElement/>
      },
      {
        path: "/importXML",
        element: <ImportXML />,
        errorElement: <ErrorElement/>
      },
      {
        path:"/profile",
        element:<Profile />,
        errorElement: <ErrorElement/>
      }
    ]

  },
  {
    path:"/login",
    element:<Login />,
    action: loginAction(store)
  },
  {
    path:"/register",
    element:<Register />,
    action: registerAction,
  }

])


const App= ()=> {
  return (<>
  <RouterProvider router={router}/>
  </>
  )
}
export default App