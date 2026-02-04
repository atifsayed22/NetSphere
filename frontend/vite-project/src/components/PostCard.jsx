import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FiMoreHorizontal, FiTrash2 } from "react-icons/fi";
import BASE_URL from "../config";

const PostCard = ({ post, onDelete }) => {
  const [liked, setLiked] = useState(
    post.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentsCount || 0);
  const [showMenu, setShowMenu] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentUserId = localStorage.getItem("userId");
  const isOwner = post.author?._id === currentUserId;

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    
    try {
      setIsDeleting(true);
      const token = localStorage.getItem("token");
      await axios.delete(`${BASE_URL}/api/posts/${post._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (onDelete) {
        onDelete(post._id);
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    } finally {
      setIsDeleting(false);
      setShowMenu(false);
    }
  };

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await axios.put(
        `${BASE_URL}/api/posts/${post._id}/like`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedPost = res.data;
      const hasLiked = updatedPost.likes.includes(userId);
      setLiked(hasLiked);
      setLikeCount(updatedPost.likes.length);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
    }
  };

  const fetchComments = async () => {
    try {
      setLoadingComments(true);
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${BASE_URL}/api/comment/${post._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComments(res.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoadingComments(false);
    }
  };

  const toggleComments = () => {
    if (!showComments) {
      fetchComments();
    }
    setShowComments(!showComments);
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${BASE_URL}/api/comment/${post._id}`,
        { content: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setComments((prev) => [...prev, res.data.comment]);
      setCommentCount((prev) => prev + 1); // instantly update count
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const getInitials = (author) => {
    const name = author?.name || "User";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <article className="post-card">
      {/* Author Section */}
      <div className="post-header">
        <Link to={`/user/${post.author?._id || post.userId}`}>
          <div className="post-avatar">
            {post?.author?.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author?.name || "User"}
                loading="lazy"
              />
            ) : (
              <div className="post-avatar-placeholder">
                <span>
                  {(
                    (post.author?.name || "User")
                      .split(" ")
                      .map((w) => w[0])
                      .join("") || "U"
                  ).toUpperCase()}
                </span>
              </div>
            )}
          </div>
        </Link>

        <div className="post-author-info">
          <Link to={`/user/${post.author?._id || post.userId}`}>
            <h3 className="post-author-name">
              {post.author?.name || "Unknown User"}
            </h3>
          </Link>
          <p className="post-author-email">
            {post.author?.email || "No email"}
          </p>
          <p className="post-date">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="post-menu-container">
          {isOwner && (
            <>
              <button
                onClick={() => setShowMenu(!showMenu)}
                className="post-menu-btn"
              >
                <FiMoreHorizontal size={20} />
              </button>
              
              {showMenu && (
                <div className="post-menu-dropdown">
                  <button
                    onClick={handleDelete}
                    disabled={isDeleting}
                    className="post-delete-btn"
                  >
                    <FiTrash2 size={16} />
                    {isDeleting ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Post Content */}
      <div className="post-content">
        {post.content && (
          <p className="post-text">{post.content}</p>
        )}
        
        {/* Post Images */}
        {post.imageUrl && post.imageUrl.length > 0 && (
          <div className="post-image-container">
            {post.imageUrl.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="Post"
                className="post-image"
                loading="lazy"
              />
            ))}
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="post-actions">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`like-btn ${liked ? 'liked' : ''}`}
        >
          {liked ? (
            <AiFillHeart size={18} />
          ) : (
            <AiOutlineHeart size={18} />
          )}
          <span>{likeCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={toggleComments}
          className="action-btn"
        >
          <FaRegComment size={18} />
          <span>{commentCount}</span>
        </button>

        {/* Share */}
        <button className="action-btn">
          <RiShareForwardLine size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="comments-section">
          {loadingComments ? (
            <p className="comments-loading">Loading comments...</p>
          ) : (
            <div className="comments-list">
              {comments.length > 0 ? (
                comments.map((c, idx) => (
                  <div key={idx} className="comment-item">
                    <span className="comment-author">
                      {c.user?.name || c.author?.name || "User"}:
                    </span>
                    <span>{c.content}</span>
                  </div>
                ))
              ) : (
                <p className="no-comments">No comments yet.</p>
              )}
            </div>
          )}

          {/* Add Comment */}
          <div className="add-comment">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="comment-input"
            />
            <button
              onClick={handleAddComment}
              className="comment-submit-btn"
            >
              Post
            </button>
          </div>
        </div>
      )}
    </article>
  );
};

export default PostCard;
