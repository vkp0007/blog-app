import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import API from "../src/api.jsx";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get("/posts");
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to load posts", err);
      }
    };
    fetchPosts();
  }, []);

  // Truncate text without "..."
  const truncateText = (text, wordLimit = 40) => {
    const words = text.split(" ");
    return words.slice(0, wordLimit).join(" ");
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 px-4 ">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">All Posts</h2>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">No posts yet</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr ">
          {posts.map((post) => (
            <div
              key={post._id}
              className="flex flex-col justify-between p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-purple-100"
            >
              <div>
                {/* Title */}
                <NavLink
                  to={`/posts/${post._id}`}
                  className="text-2xl font-bold text-blue-700 hover:text-blue-900 mb-2 block"
                >
                  {post.title}
                </NavLink>

                {/* Author + Date */}
                <div className="text-sm text-gray-800 mb-4">
                  By {post.author?.username || "Unknown"} ·{" "}
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>

                {/* Truncated Content */}
                <p className="text-gray-800 mb-4 whitespace-pre-line">
                  {truncateText(post.content, 40)}
                </p>
              </div>

              {/* Read More link */}
              <NavLink
                to={`/posts/${post._id}`}
                className="inline-block text-blue-600 hover:underline font-medium"
              >
                Read More →
              </NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
