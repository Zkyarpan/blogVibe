import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  const handleLikeClick = (postId) => {
    setLikedPosts({ ...likedPosts, [postId]: !likedPosts[postId] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`http://localhost:5700/api/posts/`);
        setPosts(res.data.slice(3, 6));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <p>Loading...</p>
        </div>
      )}
      <div className="menu">
        <h1>Others posts you may like</h1>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link-no-underline" to={`/post/${post.id}`}>
              <img
                className="post-image"
                src={`../upload/${post?.img}`}
                alt=""
                cls
              />
            </Link>
            <p className="post-title">{post.title}</p>
            <div className="between">
              {likedPosts[post.id] ? (
                <AiFillHeart onClick={() => handleLikeClick(post.id)} />
              ) : (
                <AiOutlineHeart onClick={() => handleLikeClick(post.id)} />
              )}
              <PiShareFatFill />

              <span className="read_article_btn">Read this article</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
