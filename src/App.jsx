import { useState } from "react";
import "./App.css";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  const currentUser = false;
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={currentUser ? <Home /> : <Login />}></Route>
        <Route
          path="/register"
          element={currentUser ? <Home /> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={currentUser ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/write"
          element={currentUser ? <Write /> : <Login />}
        ></Route>
        <Route
          path="/settings"
          element={currentUser ? <Settings /> : <Login />}
        ></Route>
        <Route
          path="/post/:postId"
          element={currentUser ? <Single /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
