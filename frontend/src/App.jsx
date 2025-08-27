import { BrowserRouter, Routes, Route } from "react-router"; 
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Home from "../pages/Home";
import SinglePost from "../pages/SinglePost";
import CreatePost from "../pages/CreatePost";
import Auth from "../pages/Auth";

function App() {
  const [user, setUser] = useState(null);

  // ✅ Load user from localStorage on refresh
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen  text-gray-900 ">
        {/* Navbar with shadow */}
        <Navbar user={user} setUser={setUser} />

        {/* Main content takes full width of screen */}
        <main className="w-full px-2 pt-0">  {/* Removed top padding */}
          <Routes>
            <Route path="/" element={<Home />} />

            {/* ✅ Single Post route */}
            <Route path="/posts/:id" element={<SinglePost />} />

            {/* ✅ Pass user down */}
            <Route path="/create" element={<CreatePost user={user} />} />

            {/* Auth updates user state */}
            <Route path="/auth" element={<Auth setUser={setUser} />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

