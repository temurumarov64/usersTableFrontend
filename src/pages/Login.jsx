import { loginApi } from "../api/users";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Login = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage("");

    loginApi(email, pass)
      .then((res) => {
        navigate("/users");
      })
      .catch((e) => {
        if (e === 401) {
          setMessage("Invalid credentials");
          return;
        }
        setMessage("User is blocked");
      });
  };

  return (
    <div className="login">
      <div className="auth-form-container">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="youremail@gmail.com"
            id="email"
            name="email"
          />

          <label htmlFor="password">password</label>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            placeholder="***"
            id="password"
            name="password"
          />
          <button type="submit">Log In</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/signup")}>
          Don't have an account? Register here
        </button>
        <div className="error">{message}</div>
      </div>
    </div>
  );
};
