import { createBrowserRouter } from "react-router-dom";

import Hero from "../pages/Hero";
import ConnectWallet from "../pages/ConnectWallet";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import { Layout } from "../layout/layout";
import PostCompany from "../pages/PostCompany";
import CompanyPage from "../pages/CompanyPage";
import AppliedStudents from "../pages/AppliedStudents";

export const BrowserRouter = createBrowserRouter([
  {
    element: <Layout />, // Wrap all routes with Layout
    children: [
      { path: "/", element: <Hero /> },
      { path: "/connect-wallet", element: <ConnectWallet /> },
      { path: "/admin", element: <Admin /> },
      { path: "/home", element: <Home /> },
      { path: "/post-company", element: <PostCompany /> },
      { path: "/company/:id", element: <CompanyPage /> },
      { path: "/company/applied-students/:id", element: <AppliedStudents /> },
    ],
  },
]);
