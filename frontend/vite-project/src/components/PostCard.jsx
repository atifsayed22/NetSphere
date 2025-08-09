import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { RiShareForwardLine } from "react-icons/ri";
import { FiMoreHorizontal } from "react-icons/fi";

const PostCard = ({ post }) => {
  const [liked, setLiked] = useState(
    post.likes?.includes(localStorage.getItem("userId")) || false
  );
  const [likeCount, setLikeCount] = useState(post.likes?.length || 0);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      const res = await axios.put(
        `http://localhost:8080/api/posts/${post._id}/like`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const updatedPost = res.data;
      const hasLiked = updatedPost.likes.includes(userId);
      setLiked(hasLiked);
      setLikeCount(updatedPost.likes.length);
    } catch (error) {
      console.error("Error liking/unliking post:", error);
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
      <div className="flex items-start space-x-3 mb-4">
        <Link to={`/user/${post.author?._id || post.userId}`}>
          <div className="h-12 w-12 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform">
            <span className="text-white font-semibold text-sm">
              {getInitials(post.author)}
            </span>
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
              weekday: "short", // e.g., Mon
              year: "numeric",
              month: "short", // e.g., Jan
              day: "numeric",
            })}
          </p>
        </div>

        <div className="text-gray-400 cursor-pointer">
          <FiMoreHorizontal size={20} />
        </div>
      </div>

      <div className="mb-4">
        <p className="text-gray-800 leading-relaxed">{post.content}</p>
      </div>

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
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        {/* Comment */}
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <FaRegComment size={18} />
          <span className="text-sm font-medium">
            {post.comments?.length || 0}
          </span>
        </button>

        {/* Share */}
        <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-gray-600">
          <RiShareForwardLine size={18} />
          <span className="text-sm font-medium">Share</span>
        </button>
      </div>
    </article>
  );
};

export default PostCard;
