import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import BASE_URL from "../config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/posts`);
      setPosts(res.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []); // ✅ fixed infinite loop issue

  // Refresh posts after creating a new one
  const handlePostCreated = () => {
    fetchPosts();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-4 text-gray-500 text-sm">Fetching latest posts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      {/* Create Post Section */}
      <div className="sticky top-0 z-10 bg-white shadow-sm p-4 rounded-xl border border-gray-200 mb-6">
        <CreatePost onPostCreated={handlePostCreated} />
      </div>

      {/* Posts List */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            <p className="text-lg font-medium">No posts yet 😔</p>
            <p className="text-sm">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={post._id || post.id}
              className="transition-all duration-300 ease-in-out transform hover:scale-[1.01] hover:shadow-lg rounded-xl"
              style={{ animation: `fadeInUp 0.3s ease ${index * 0.05}s both` }}
            >
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>

      
    </div>
  );
};

export default Home;
