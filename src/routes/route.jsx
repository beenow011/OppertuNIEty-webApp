import { createBrowserRouter } from "react-router-dom";

import Hero from "../pages/Hero";
import ConnectWallet from "../pages/ConnectWallet";
import Admin from "../pages/Admin";
import Home from "../pages/Home";
import { Layout } from "../layout/layout";
import PostCompany from "../pages/PostCompany";
import CompanyPage from "../pages/CompanyPage";
import AppliedStudents from "../pages/AppliedStudents";
import UploadResourse from "../pages/UploadResourse";
import UploadFaq from "../pages/UploadFaq";
import AllCompanies from "../comp/AllCompanies";
import AddContest from "../pages/AddContest";
import AllContest from "../pages/allContest";
import ContestManage from "../pages/ContestManage";

export const BrowserRouter = createBrowserRouter([
  {
    element: <Layout />, // Wrap all routes with Layout
    children: [
      { path: "/", element: <Hero /> },
      { path: "/connect-wallet", element: <ConnectWallet /> },
      { path: "/admin", element: <Admin /> },
      { path: "/home", element: <Home /> },
      { path: "/post-company", element: <PostCompany /> },
      { path: "/active-companies", element: <AllCompanies /> },
      { path: "/company/:id", element: <CompanyPage /> },
      { path: "/company/applied-students/:id", element: <AppliedStudents /> },
      { path: "/company/upload-resourse/:id", element: <UploadResourse /> },
      { path: "/company/upload-faq/:id", element: <UploadFaq /> },
      { path: "/add-contest", element: <AddContest /> },
      { path: "/all-Contest", element: <AllContest /> },
      { path: "/contest/:id", element: <ContestManage /> },
    ],
  },
]);
