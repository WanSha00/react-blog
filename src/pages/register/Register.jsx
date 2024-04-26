import { useState } from "react";
import "./Register.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);

    try {
      const res = await axios.post(apiUrl + "/auth/register", {
        username,
        email,
        password,
      });

      if(res.data){
        window.location.replace("/login");
      }
    } catch (error) {
      console.log(error)
      setError(true);
    }
  };

  return (
    <>
      <div className="register">
        <span className="registerTitle">Register</span>
        <form className="registerForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your username..."
            maxlength="10"
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Email</label>
          <input
            type="email"
            name=""
            id=""
            placeholder="Enter your email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Password</label>
          <input
            type="password"
            name=""
            id=""
            placeholder="Enter your password..."
            minlength="4"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="registerButton" type="submit">
            Register
          </button>
        </form>
        <button className="registerLoginButton">
          <Link className="link" to="/login">
            Login
          </Link>
        </button>
        {error && (<span className="error">Username/Email already taken.</span>)}
        
      </div>
    </>
  );
}

export default Register;
