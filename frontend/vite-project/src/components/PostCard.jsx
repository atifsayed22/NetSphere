import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";
import BASE_URL from "../config";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(
    post.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [commentCount, setCommentCount] = useState(post.commentsCount || 0); // store count separately

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
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      {/* Author Section */}
      <div className="flex items-start space-x-3 mb-4">
        <Link to={`/user/${post.author?._id || post.userId}`}>
          <div className="h-12 w-12 rounded-full overflow-hidden flex-shrink-0 hover:scale-105 transition-transform border border-gray-200 bg-gray-100">
            {post?.author?.profileImage ? (
              <img
                src={post.author.profileImage}
                alt={post.author?.name || "User"}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            ) : (
              <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-blue-400 to-purple-600">
                <span className="text-white font-semibold text-xs">
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

        <div className="flex-1">
          <Link to={`/user/${post.author?._id || post.userId}`}>
            <h3 className="font-semibold text-gray-900 hover:underline cursor-pointer">
              {post.author?.name || "Unknown User"}
            </h3>
          </Link>
          <p className="text-sm text-gray-600">
            {post.author?.email || "No email"}
          </p>
          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              weekday: "short",
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
        <div className="text-gray-400 cursor-pointer">
          <FiMoreHorizontal size={20} />
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        {/* Like */}
        <button
          onClick={handleLike}
          className={`flex items-center gap-1 px-2 py-1 rounded-md border text-sm font-medium transition-all duration-200 ${
            liked
              ? "bg-red-100 text-red-600 border-red-200"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          {liked ? (
            <AiFillHeart size={18} className="text-red-500" />
          ) : (
            <AiOutlineHeart size={18} />
          )}
          <span>{likeCount}</span>
        </button>

        {/* Comment */}
        <button
          onClick={toggleComments}
          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600"
        >
          <FaRegComment size={18} />
          <span>{commentCount}</span>
        </button>

        {/* Share */}
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <RiShareForwardLine size={18} />
          <span>Share</span>
        </button>
      </div>

      {/* Comment Section */}
      {showComments && (
        <div className="mt-4 border-t pt-4">
          {loadingComments ? (
            <p className="text-gray-500 text-sm">Loading comments...</p>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto">
              {comments.length > 0 ? (
                comments.map((c, idx) => (
                  <div key={idx} className="flex space-x-2 text-sm">
                    <span className="font-semibold">
                      {c.user?.name || c.author?.name || "User"}:
                    </span>
                    <span>{c.content}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">No comments yet.</p>
              )}
            </div>
          )}

          {/* Add Comment */}
          <div className="mt-3 flex items-center space-x-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <button
              onClick={handleAddComment}
              className="px-3 py-2 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600"
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
