import { useState } from "react";

import "./App.css";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import Singup from "./Pages/Signup";
import OTPVerify from "./Pages/OTPVerify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path={"/"} element={<Singup />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/verification"} element={<OTPVerify />} />
      </Routes>
    </>
  );
}

export default App;
