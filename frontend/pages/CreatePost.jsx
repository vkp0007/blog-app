import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import API from "../src/api.jsx";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreatePost({ user }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const currentUser = user || JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!currentUser) {
      navigate("/auth");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post(
        "/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      toast.success("Post published successfully! 🎉", { autoClose: 3000 });
      setTitle("");
      setContent("");
      setTimeout(() => navigate("/"), 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to publish post ❌", { autoClose: 5000 });
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-10 bg-white p-8 rounded-2xl shadow-md border-1 border-blue-400 min-h-[100px]">
      <ToastContainer />
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Create New Post
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 h-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300"
          required
        />

        <textarea
          placeholder="Content"
          rows="10"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-300 resize-y flex-grow"
          required
        />

        <button
          type="submit"
          className="bg-purple-400 text-white py-4 px-10 rounded-lg font-medium text-sm self-start"
        >
          Publish
        </button>
      </form>
    </div>
  );
}

export default CreatePost;
