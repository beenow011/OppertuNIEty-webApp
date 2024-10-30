import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Web3Provider from "./context/Web3Provider";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./routes/route";
// import { jwt } from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

import Header from "./comp/Header";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      const token = localStorage.getItem("token");
      const decoded = jwtDecode(token);
      console.log(decoded);
    }
  }, []);

  return (
    <div className="bg-gray-950 w-full h-full">
      <Header />
      <RouterProvider router={BrowserRouter}></RouterProvider>
    </div>
  );
}

export default App;
