import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const cat = useLocation().search;
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5700/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let text = doc.body.textContent;
    let words = text.split(" ");
    if (words.length > 110) {
      words = words.slice(0, 110);
      text = words.join(" ") + "...";
    }

    return text;
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
      <div className="home">
        <div className="posts">
          {posts.map((post) => (
            <div className="post" key={post.id}>
              <div className="img">
                <img src={`../upload/${post.img}`} alt="" />
              </div>

              <div className="content">
                {currentUser ? (
                  <div>
                    <h2>{post.title}</h2>
                    <hr />
                  </div>
                ) : (
                  <h2>{post.title}</h2>
                )}
                <p>{getText(post.desc)}</p>
                <Link className="link" to={`/post/${post.id}`}>
                  <button className="read_article_btn">
                    Read this article
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
