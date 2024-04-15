import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import { Bookings, Calender, Dashboard, HomeLayout, ImportXML, Login, Profile, Register,Blog,Error,CreateBooking, SingleBlogPage} from "./pages";
import {action as loginAction } from "./pages/Login"
import {action as registerAction } from "./pages/Register"
import { action as blogAction } from "./pages/Blog"
import { action as singleBlogAction } from "./pages/SingleBlogPage"
import { loader as singleBlogLoader } from "./pages/SingleBlogPage"
import {loader as blogLoader } from "./pages/Blog"
import AuthRoute from "./components/AuthRoute"
import ErrorElement from "./components/ErrorElement";
import store from "./store";
import ClassesByDay, {  loader as classesByDayLoader} from "./components/ClassesByDay";
import {loader as createBookingLoader} from "./pages/CreateBooking"
import {loader as bookingLoader} from "./pages/Bookings"


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
        loader: bookingLoader(store)
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
        errorElement: <ErrorElement/>,
        children : [
          {
            index: true,
            element: <Navigate to="/calender/Monday" replace />
          },
          {
            path: ":day",
            element: <ClassesByDay />,
            loader: classesByDayLoader(store)
          },
        ]
      },
      {
        path: "/calender/:day/:id",
        element: <CreateBooking />,
        loader: createBookingLoader(store)
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
        element: <ImportXML uploadURL="/importXML/user" />,
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