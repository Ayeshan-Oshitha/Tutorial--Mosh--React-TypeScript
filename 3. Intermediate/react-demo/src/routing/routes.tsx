import { createBrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";
import UserList from "./UserList";
import ContactPage from "./ContactPage";
import UserDetail from "./UserDetail";
import Layout from "./Layout";
import UsersPage from "./UsersPage";
import About from "./About";
import ErrorPage from "./ErrorPage";
import LoginPage from "./LoginPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/users",
        element: <UsersPage />,
        children: [{ path: ":id", element: <UserDetail /> }],
      },
      { path: "/contact", element: <ContactPage /> },
      { path: "/login", element: <LoginPage /> },
    ],
  },
]);

export default router;
