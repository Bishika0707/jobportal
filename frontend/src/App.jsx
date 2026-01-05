import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Navbar from "./components/shared/Navbar"
import Login from "./components/auth/login"
import Signup from "./components/auth/Signup"
import Home from "./components/Home"

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/Login',
    element: <Login />
  },
  {
    path: '/Signup',
    element: <Signup />
  }
])

function App() {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>

  )
}

export default App