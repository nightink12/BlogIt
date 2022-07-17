import { lazy } from "react";

// project imports
// import MainLayout from 'layout/MainLayout';

import MainLayout from "layout/MainLayout";
import Loadable from "components/Loadable";
import { userAuth, getUserSession, setUserSession } from "Helper/AuthFunc";
import RequireAuth from "./RequireAuth";

const HomePage = Loadable(lazy(() => import("pages/HomePage")));
const About = Loadable(lazy(() => import("pages/About")));
const CreatePost = Loadable(lazy(() => import("pages/CreatePost")));
const PostDetails = Loadable(lazy(() => import("pages/PostDetails")));
const EditPost = Loadable(lazy(() => import("pages/EditPost")));
const Posts = Loadable(lazy(() => import("pages/Posts")));
const Profile = Loadable(lazy(() => import("pages/Profile")));

const Login = Loadable(lazy(() => import("pages/Login")));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  element: <MainLayout />,

  children: [
    {
      path: "/",
      element: <HomePage />,
    },

    {
      path: "/about",
      element: <About />,
    },
    {
      path: "/createpost",
      element: (
        <RequireAuth>
          <CreatePost />
        </RequireAuth>
      ),
    },

    {
      path: "/postdetails/:id",
      element: (
        <RequireAuth>
          <PostDetails />
        </RequireAuth>
      ),
    },

    {
      path: "/editpost/:id",
      element: (
        <RequireAuth>
          <EditPost />
        </RequireAuth>
      ),
    },

    {
      path: "/posts",
      element: <Posts />,
    },

    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/profile",
      element: (
        <RequireAuth>
          <Profile />
        </RequireAuth>
      ),
    },
  ],
};

export default MainRoutes;
