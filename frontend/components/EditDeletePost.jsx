import { useState } from "react";
import API from "../src/api.jsx";
import { toast } from "react-toastify";

function EditDeletePost({ post, token, onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");

  const handleUpdate = async () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Title and content cannot be empty!");
      return;
    }

    try {
      const res = await API.put(
        `/posts/${post._id}`,
        { title, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Post updated successfully!");
      onUpdate(res.data);
      setIsEditing(false);
    } catch (err) {
      toast.error("Failed to update post ❌");
      console.error(err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;

    try {
      await API.delete(`/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Post deleted successfully!");
      onDelete();
    } catch (err) {
      toast.error("Failed to delete post ❌");
      console.error(err);
    }
  };

  return (
    <div className="mt-4">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            rows="6"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
          />
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 text-white px-4 py-1 rounded-lg text-sm"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-gray-300 text-gray-700 px-4 py-1 rounded-lg text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-3 py-1 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default EditDeletePost;
