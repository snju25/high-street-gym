import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Bookings, Calender, Dashboard, HomeLayout, ImportXML, Login, Profile, Register,Blog,Error} from "./pages";
import AuthRoute from "./components/AuthRoute"
import ErrorElement from "./components/ErrorElement";
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
      {
        path: "/bookings",
        element: <Bookings />,
        errorElement: <ErrorElement/>
      },
      {
        path: "/calender",
        element: <Calender />,
        errorElement: <ErrorElement/>
      },
      {
        path: "/blog",
        element: <Blog />,
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
    element:<Login />
  },
  {
    path:"/register",
    element:<Register />
  }

])


const App= ()=> {
  return (<>
  <RouterProvider router={router}/>
  </>
  )
}
export default App