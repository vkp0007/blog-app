import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import API from "../src/api.jsx";
import EditDeletePost from "../components/EditDeletePost.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function SinglePost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const currentUser = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await API.get(`/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) {
    return <p className="p-6 text-gray-500 text-center">Loading...</p>;
  }

  if (!post) {
    return <p className="text-gray-500 text-center mt-10">Post not found.</p>;
  }

  // ✅ Handle both id and _id
  const userId = currentUser?._id || currentUser?.id;
  const authorId = post.author?._id || post.author?.id;

  const isAuthor =
    userId && authorId ? userId.toString() === authorId.toString() : false;

  console.log("Current User:", currentUser);
  console.log("Post Author:", post.author);
  console.log("isAuthor:", isAuthor);

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <ToastContainer />
      <div className="p-10 border border-gray-200 rounded-2xl shadow-md bg-purple-50 mb-10">
        <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
          {post.title}
        </h2>

        <div className="text-sm text-gray-500 mb-6 italic">
          By {post.author?.username || "Unknown"} ·{" "}
          {new Date(post.createdAt).toLocaleDateString()}
        </div>

        <p className="text-gray-800 text-lg leading-8 whitespace-pre-line mb-4">
          {post.content}
        </p>

        {isAuthor && (
          <EditDeletePost
            post={post}
            token={token}
            onUpdate={(updatedPost) => setPost(updatedPost)}
            onDelete={() => navigate("/")}
          />
        )}
      </div>
    </div>
  );
}

export default SinglePost;
