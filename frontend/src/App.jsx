import AuthRoute from "./components/AuthRoute"
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Bookings, Calender, Dashboard, HomeLayout, ImportXML, Login, Profile, Register,Blog,Error,SingleBlogPage} from "./pages";
import {action as loginAction } from "./pages/Login"
import {action as registerAction } from "./pages/Register"
import { action as blogAction } from "./pages/Blog"
import { action as singleBlogAction } from "./pages/SingleBlogPage"
import { loader as singleBlogLoader } from "./pages/SingleBlogPage"
import {loader as blogLoader } from "./pages/Blog"
import ErrorElement from "./components/ErrorElement";
import store from "./store";
import {loader as bookingLoader} from "./pages/Bookings"
import CreateBooking, { loader as createBookingLoader } from "./pages/CreateBooking";



const router = createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      // read and delete the bookings here ..............//
      {
        path: "/bookings",
        element: <Bookings />,
        loader: bookingLoader(store),
        errorElement: <ErrorElement/>,
      },
      // display classes here........................//
      {
        index: true,
        element: <Calender />,
        errorElement: <ErrorElement/>,
      
      },
      // Create blog post and read all blog post here............. with title.../////
      {
        path: "/blog",
        element: <Blog />,
        errorElement:<ErrorElement/>,
        action: blogAction(store),
        loader: blogLoader(store),
      },
      // Single blog post read page............//
      {
        path: "/blog/:id",
        element: <SingleBlogPage />,
        errorElement:<ErrorElement/>,
        loader: singleBlogLoader(store),
        action: singleBlogAction(store),
      },
      {
        path: "/importXML",
        element: <AuthRoute><ImportXML uploadURL="/importXML" /></AuthRoute>,
        errorElement: <ErrorElement/>
      },
      {
        path:"/profile",
        element: <AuthRoute><Profile /></AuthRoute>,
        errorElement: <ErrorElement/>
      },
      {
        path:"/createBooking/:date/:id",
        element: <AuthRoute><CreateBooking/></AuthRoute>,
        errorElement: <ErrorElement/>,
        loader: createBookingLoader(store)
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