import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../api/users";

export const SignUp = (props) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      signUpApi(name, email, pass).then((res) => {
        navigate("/login");
      });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="login">
      <div className="auth-form-container">
        <h2>Sign Up</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label htmlFor="name">full name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            id="name"
            name="name"
          />
          <label htmlFor="email">email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="example@gmail.com"
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
          <button type="submit">Sign Up</button>
        </form>
        <button className="link-btn" onClick={() => navigate("/login")}>
          Already have an account? Login here
        </button>
      </div>
    </div>
  );
};
