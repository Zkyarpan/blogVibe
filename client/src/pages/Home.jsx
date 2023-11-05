import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const cat = useLocation().search;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5700/api/posts${cat}`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return (
    <>
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
                <Link className="link" to={`/post/${post.id}`}>
                  <h2>{post.title}</h2>
                </Link>
                <p>{getText(post.desc)}</p>
                {/* <button className="buttons">Read More</button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
