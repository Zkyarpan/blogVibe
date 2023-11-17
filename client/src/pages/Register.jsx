import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [err, setError] = useState(null);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const upload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post(
          "http://localhost:5700/api/upload",
          formData
        );
        return res.data;
      }
      return "";
    } catch (error) {
      console.log(error);
      return "";
    }
  };

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputs.username || !inputs.email || !inputs.password) {
      setError("Please fill in all fields");
      return;
    }

    if (inputs.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    const imgUrl = await upload();

    try {
      await axios.post("http://localhost:5700/api/auth/register", {
        ...inputs,
        img: imgUrl,
      });

      navigate("/login");
    } catch (error) {
      setError(error.response.data);
    }
  };
  setTimeout(() => {
    setError(false);
  }, 5000);

  return (
    <>
      <div className="register_auth">
        <div className="blur" style={{ top: "-18%", right: "0" }}></div>
        <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
        <div className="register_slogan">
          <span className="register_firstslogan">
            {" "}
            Welcome to <span className="color">Blog</span> Vibes
          </span>
          <br />
          <span className="register_secondslogan">
            "Connecting Minds, Sharing Voices"
          </span>
        </div>
        <form className="form">
          <div>
            <h1 className="register_heading">Register</h1>
            <span className="register_secondhead">
              Already have an account?
              <Link className="register_link" to="/login">
                {" "}
                Login
              </Link>
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
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            required
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <input
            style={{ display: "none" }}
            type="file"
            id="file"
            name="img"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label class="file" for="file">
            <img
              className="defaultusericon"
              src="./defaultuser.png"
              alt="default user icon"
            />
            <div class="add-avatar-section">
              Add your avatar
              <span>PNG or JPG</span>
            </div>
            <img className="uploadicon" src="./upload.png" alt="uploadicon" />
          </label>

          <button className="button" onClick={handleSubmit}>
            Register
          </button>
          <div className="register_error">{err && <p>{err}</p>}</div>
        </form>
      </div>
    </>
  );
};

export default Register;
