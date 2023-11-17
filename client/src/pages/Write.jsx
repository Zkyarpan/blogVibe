import { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

const Write = () => {
  const navigate = useNavigate();
  const state = useLocation().state;
  const [value, setValue] = useState(state?.desc || "");
  const [title, setTitle] = useState(state?.title || "");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState(state?.cat || "");
  const [wordCount, setWordCount] = useState(0);
  const [date, setDate] = useState(new Date());
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleTextChange = (text) => {
    setValue(text);
    setWordCount(text.split(/\s+/).filter((item) => item).length);
  };

  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 3000);
  };

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5700/api/upload",
        formData
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    if (title === "" || value === "" || cat === "") {
      displayErrorMessage("Please fill in all the fields.");
      return;
    }
    let imgUrl = state?.img || "";
    if (file) {
      imgUrl = await upload();
    }
    try {
      setLoading(true);
      if (state) {
        await axios.put(
          `http://localhost:5700/api/posts/${state.id}`,
          {
            title,
            desc: value,
            cat,
            img: imgUrl,
          },
          { withCredentials: true }
        );
      } else {
        await axios.post(
          `http://localhost:5700/api/posts`,
          {
            title,
            desc: value,
            cat,
            img: imgUrl,
            date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
          },
          { withCredentials: true }
        );
      }

      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="blur" style={{ top: "10%", left: "-15rem" }}></div>
      <div className="add">
        <div className="content">
          <div className={`error ${errorMessage ? "show" : ""}`}>
            {errorMessage}
          </div>

          <input
            type="text"
            placeholder="Add your title"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="editorContainer">
            <ReactQuill
              className="editor"
              theme="snow"
              value={value}
              onChange={handleTextChange}
            />
          </div>
        </div>
        <div className="menu">
          <div className="item">
            <h1 className="words">Category</h1>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "art"}
                name="cat"
                value="art"
                id="art"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="art">Art</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "science"}
                name="cat"
                value="science"
                id="science"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="science">Science</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "technology"}
                name="cat"
                value="technology"
                id="technology"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="technology">Technology</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "cinema"}
                name="cat"
                value="cinema"
                id="cinema"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="cinema">Cinema</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "design"}
                name="cat"
                value="design"
                id="design"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="design">Design</label>
            </div>
            <div className="cat">
              <input
                type="radio"
                checked={cat === "food"}
                name="cat"
                value="food"
                id="food"
                onChange={(e) => setCat(e.target.value)}
              />
              <label htmlFor="food">Food</label>
            </div>
          </div>
          <div className="item">
            <span>
              <b>Status: </b> In Progress
            </span>
            <span>
              <b>Visibility: </b> Public
            </span>
            <span>
              <b>Word Count: </b> {wordCount}
            </span>
            <span>
              <b>Published On: </b>
              {date.toLocaleDateString()}
            </span>
            <input
              style={{ display: "none" }}
              type="file"
              id="file"
              name=""
              onChange={(e) => setFile(e.target.files[0])}
            />
            <div className="betweens">
              <label className="upload_img" htmlFor="file">
                Upload Image
              </label>
              <div className="buttons">
                <button type="submit" disabled={loading} onClick={handleClick}>
                  {loading ? "Publishing.." : "Publish"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Write;
