import { useContext, useRef, useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import axios from "axios";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [message, setMessage] = useState("");
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });

    try {
      const res = await axios.post(apiUrl + "/auth/login", {
        email: emailRef.current.value,
        password: passwordRef.current.value,
      });

      if (res) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      }
    } catch (error) {
      console.log("error: " + error)
      //setMessage(error.response.data);
      dispatch({ type: "LOGIN_FAIL" });
    }
  };

  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Email</label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email..."
            required
            ref={emailRef}
          />
          <label>Password</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password..."
            required
            ref={passwordRef}
          />

          <span className="message">{message}</span>
          <button className="loginButton" type="submit" disabled={isFetching}>
            Login
          </button>
        </form>
        <button className="loginRegisterButton">
          <Link className="link" to="/register">
            Register
          </Link>
        </button>
      </div>
    </>
  );
}

export default Login;
