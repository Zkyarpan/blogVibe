import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";

import { Footer, Home, Login, Navbar, Register, Single, Write } from "./pages";
import "./style.scss";
import { AuthContext } from "./context/authContext";

const Layout = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {currentUser ? <Outlet /> : <Navigate to="/login" />}
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/write",
        element: <Write />,
      },
    ],
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

const App = () => {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
};

export default App;
