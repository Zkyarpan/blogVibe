import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { PiShareFatFill } from "react-icons/pi";

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});

  const handleLikeClick = (postId) => {
    setLikedPosts({ ...likedPosts, [postId]: !likedPosts[postId] });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5700/api/posts/`);
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const getRandomReadTime = () => {
    return Math.floor(Math.random() * (20 - 5 + 1)) + 5; 
  };

  return (
    <>
      <div className="menu">
        <h1>Others posts you may like</h1>
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <Link className="link-no-underline" to={`/post/${post.id}`}>
              <img
                className="post-image"
                src={`../upload/${post?.img}`}
                alt=""
              />
              <p className="post-title">{post.title}</p>
            </Link>
            <div className="between">
              {likedPosts[post.id] ? (
                <AiFillHeart onClick={() => handleLikeClick(post.id)} />
              ) : (
                <AiOutlineHeart onClick={() => handleLikeClick(post.id)} />
              )}
              <PiShareFatFill />
              <span>Read Time: {getRandomReadTime()} min</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
