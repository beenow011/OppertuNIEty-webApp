import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Web3Provider from "./context/Web3Provider";
import { RouterProvider } from "react-router-dom";
import { BrowserRouter } from "./routes/route";
import Header from "./comp/Header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="bg-gray-950 w-full h-full">
      <Web3Provider>
        <Header />
        <RouterProvider router={BrowserRouter}></RouterProvider>
      </Web3Provider>
    </div>
  );
}

export default App;
