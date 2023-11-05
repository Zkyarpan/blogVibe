import React, { useState } from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setError] = useState(null);

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
      await login(inputs);
      navigate("/");
    } catch (err) {
      setError(err.response.data);
    }
  };
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
          Login
        </button>
        <div className="error">{err && <p>{err}</p>}</div>
      </form>
    </div>
  );
};

export default Login;
