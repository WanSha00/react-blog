import "./Login.css";
import { Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className="login">
        <span className="loginTitle">Login</span>
        <form className="loginForm">
          <label>Email</label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email..."
            required
          />
          <label>Password</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password..."
            required
          />
          <button className="loginButton">Login</button>
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
