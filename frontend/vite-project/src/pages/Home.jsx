import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import BASE_URL from "../config";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (pageNum = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      
      const res = await axios.get(`${BASE_URL}/api/posts?page=${pageNum}&limit=5`);
      const { posts: newPosts, hasMore: moreAvailable } = res.data;
      
      if (append) {
        setPosts(prev => [...prev, ...newPosts]);
      } else {
        setPosts(newPosts);
      }
      
      setHasMore(moreAvailable);
      setPage(pageNum);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, false);
  }, []);

  // Refresh posts after creating a new one (reset to page 1)
  const handlePostCreated = () => {
    fetchPosts(1, false);
  };

  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      fetchPosts(page + 1, true);
    }
  };

  // Handle post deletion from feed
  const handlePostDelete = (postId) => {
    setPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Fetching latest posts...</p>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Create Post Section */}
      <div className="create-post-section">
        <CreatePost onPostCreated={handlePostCreated} />
      </div>

      {/* Posts List */}
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="empty-posts">
            <p className="empty-posts-title">No posts yet 😔</p>
            <p className="empty-posts-subtitle">Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post, index) => (
            <div
              key={post._id || post.id}
              className="post-wrapper"
              style={{ animation: `fadeInUp 0.3s ease ${index * 0.05}s both` }}
            >
              <PostCard post={post} onDelete={handlePostDelete} />
            </div>
          ))
        )}
      </div>

      {/* Load More Button */}
      {hasMore && posts.length > 0 && (
        <div className="load-more-container">
          <button
            onClick={handleLoadMore}
            disabled={loadingMore}
            className="load-more-btn"
          >
            {loadingMore ? (
              <span className="load-more-content">
                <div className="spinner-small"></div>
                Loading...
              </span>
            ) : (
              'Load More Posts'
            )}
          </button>
        </div>
      )}

      {!hasMore && posts.length > 0 && (
        <p className="end-message">You've reached the end!</p>
      )}
    </div>
  );
};

export default Home;
