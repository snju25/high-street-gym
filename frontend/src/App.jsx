import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { Bookings, Calender, Dashboard, HomeLayout, ImportXML, Login, Profile, Register,Blog} from "./pages";

const router = createBrowserRouter([
  {
    path:'/',
    element: <HomeLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
      },
      {
        path: "/calender",
        element: <Calender />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/importXML",
        element: <ImportXML />,
      },
      {
        path:"/profile",
        element:<Profile />
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