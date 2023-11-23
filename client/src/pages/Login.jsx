import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";
import { GoogleLogin } from "react-google-login";

const responseGoogle = async (response) => {
  console.log(response);

  // Check if the authentication was successful
  if (response && response.profileObj) {
    try {
      // Make a POST request to your backend API with the Google response
      const apiResponse = await axios.post(
        "http://localhost:5173/api/googleAuth/login/success",
        {
          googleResponse: response,
        }
      );

      console.log("Successfully hit the success API:", apiResponse.data);
      // You can perform additional actions if needed
    } catch (error) {
      console.error("Error hitting the success API:", error);
      // Handle the error if needed
    }
  }
};

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.password) {
      setError("Please fill in all fields");
      return;
    }
    try {
      setLoading(true);
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  setTimeout(() => {
    setError(false);
  }, 5000);

  return (
    <div className="auth">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <form>
        <div className="register_slogan">
          <span className="register_firstslogan">
            {" "}
            <span className="color">Login</span> to <span>Blog</span> Vibes
          </span>
          <br />
          <span className="register_secondslogan">
            "Connecting Minds, Sharing Voices"
          </span>
        </div>
        <div>
          <h1 className="heading">Log In</h1>
          <span className="secondhead">
            New user?{" "}
            <Link className="link" to={"/register"}>
              {" "}
              Create an account{" "}
            </Link>{" "}
          </span>
        </div>
        <input
          required
          type="text"
          placeholder="Username"
          name="username"
          onChange={handleChange}
        />
        <input
          required
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
        />
        <button className="button" onClick={handleSubmit}>
          {loading ? "Login.." : "Login"}
        </button>
        <GoogleLogin
          clientId="206155733129-h4p4fkdbhqi5eu3kan7ri91u1b7q8em0.apps.googleusercontent.com"
          buttonText="Login with Google"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          redirectUri="http://localhost:5700/api/googleAuth/auth/google/callback"
        />
        <div className="error">{err && <p>{err}</p>}</div>
      </form>
    </div>
  );
};

export default Login;
