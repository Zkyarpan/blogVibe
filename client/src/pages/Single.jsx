import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import DOMPurify from "dompurify";

import edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";
import { AuthContext } from "../context/authContext";

const Single = () => {
  const [loading, setLoading] = useState(true);
  const [post, setPosts] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const postId = location.pathname.split("/")[2];
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:5700/api/posts/${postId}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`http://localhost:5700/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <p>Loading...</p>
        </div>
      )}
      <div className="blur" style={{ top: "10%", left: "-15rem" }}></div>
      <div className="blur" style={{ top: "50rem", left: "-15rem" }}></div>
      {currentUser && (
        <div className="single">
          <div className="content">
            <img src={`../upload/${post?.img}`} alt="" />

            <div className="user">
              <div className="user-info">
                {post.userImg && (
                  <img src={`../upload/${post.userImg}`} alt="" />
                )}
                <div className="info">
                  <span>{post.username}</span>
                  <span className="date_time">
                    <i className="fa-regular fa-clock"></i>
                    Posted {moment(post.date).fromNow()}
                  </span>
                </div>
              </div>
              {currentUser?.username === post.username && (
                <div className="edit">
                  <Link to={`/write?edit=2`} state={post}>
                    <img className="icons" src={edit} alt="deleteicon" />
                  </Link>
                  <img
                    onClick={handleDelete}
                    className="icons"
                    src={Delete}
                    alt="deleteicon"
                  />
                </div>
              )}
            </div>

            <div className="title_desc_sec">
              <h1>{post.title}</h1>
              <hr />
              <p
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(post.desc),
                }}
              ></p>
            </div>
            <Link to={"/"}>
              <button className="go_back_btn">Go back</button>
            </Link>
          </div>
          <Menu />
        </div>
      )}
    </>
  );
};

export default Single;
