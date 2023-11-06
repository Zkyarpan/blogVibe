import axios from "axios";
import { useEffect, useState } from "react";

const Menu = ({ cat }) => {
  const [posts, setPosts] = useState([]);
  const [fullDesc, setFullDesc] = useState('');
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5700/api/posts/?cat=${cat}`
        );
        setPosts(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [cat]);

  const truncateDesc = (desc) => {
    const words = desc.split(" ");
    if (words.length > 50) {
      return words.slice(0, 50).join(" ") + "...";
    }
    return desc;
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return truncateDesc(doc.body.textContent);
  };
  

  return (
    <div className="menu">
      <h1>Others posts you may like</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <img className="post-image" src={`../upload/${post?.img}`} alt="" />
          <p className="post-title">{post.title}</p>
          <p className="post-desc">{getText(post.desc)}</p>
          <button className="read-more-button">Read More</button>
        </div>
      ))}
    </div>
  );
};

export default Menu;
