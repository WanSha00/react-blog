import { useContext, useState } from "react";
import "./App.css";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Profile from "./pages/profile/Profile";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const {user} = useContext(Context);

  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route path="/" element={user ? <Home /> : <Login />}></Route>
        <Route
          path="/register"
          element={user ? <Home /> : <Register />}
        ></Route>
        <Route
          path="/login"
          element={user ? <Home /> : <Login />}
        ></Route>
        <Route
          path="/write"
          element={user ? <Write /> : <Login />}
        ></Route>
        <Route
          path="/profile/:userId"
          element={user ? <Profile /> : <Login />}
        ></Route>
        <Route
          path="/settings"
          element={user ? <Settings /> : <Login />}
        ></Route>
        <Route
          path="/post/:postId"
          element={user ? <Single /> : <Login />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
