import { createBrowserRouter } from "react-router-dom";

import Hero from "../pages/Hero";
import ConnectWallet from "../pages/ConnectWallet";
import Admin from "../pages/Admin";
import Home from "../pages/Home";

export const BrowserRouter = createBrowserRouter([
  { path: "/", element: <Hero /> },
  { path: "/connect-wallet", element: <ConnectWallet /> },
  { path: "/admin", element: <Admin /> },
  { path: "/home", element: <Home /> },
]);
