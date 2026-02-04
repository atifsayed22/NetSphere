import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";
import BASE_URL from "../config";

const UserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState("none"); // 'none', 'pending', 'accepted'

  const currentUserId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const fetchConnectionStatus = async () => {
    if (!token) return; // Not authenticated
    try {
      const res = await axios.get(
        `${BASE_URL}/api/connections/isConnection/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      // Use 'connectionStatus' key as per backend
      setConnectionStatus(res.data.connectionStatus || "none");
    } catch (error) {
      console.error("Error fetching connection status:", error.response?.data || error.message);
      setConnectionStatus("none");
    }
  };
  
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/posts/user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserPosts(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching user posts:", err);
      setUserPosts([]);
    }
  };

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/profile/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(res.data.user || null);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUserData(null);
    }
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([fetchUserData(), fetchUserPosts(), fetchConnectionStatus()])
      .finally(() => setLoading(false));
  }, [userId]);

  const handleConnectionAction = async () => {
    if (!token) {
      console.error("No auth token found");
      return;
    }

    try {
      if (connectionStatus === "none") {
        const res = await axios.post(
          `${BASE_URL}/api/connections/send`,
          { recipientId: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConnectionStatus(res.data.status || "pending");
      } else if (connectionStatus === "pending") {
        await axios.delete(
          `${BASE_URL}/api/connections/cancel/${userId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setConnectionStatus("none");
      } else if (connectionStatus === "accepted") {
        // Disable button or optionally disconnect (if your backend supports it)
      }
    } catch (error) {
      console.error("Connection action error:", error.response?.data || error.message);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="spinner-blue"></div>
          <p className="profile-loading-text">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <p className="profile-error-text">Failed to load profile. Please try again later.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-card">
        <div className="profile-banner"></div>

        <div className="profile-info-section">
          <div className="profile-avatar-container">
            {userData.profileImage ? (
              <img
                src={userData.profileImage}
                alt={userData.name}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                <span>
                  {getInitials(userData.name)}
                </span>
              </div>
            )}
          </div>

          <div className="profile-details">
            <h1 className="profile-name">{userData.name}</h1>
            <p className="profile-email">{userData.email}</p>
            <div className="profile-stats">
              <span>{userData.connections?.length || 0} connections</span>
              <span>{userPosts.length} posts</span>
            </div>

            {currentUserId !== userId && (
              <button
                onClick={handleConnectionAction}
                disabled={connectionStatus === "accepted"}
                className={connectionStatus === "accepted" ? "connected-badge" : connectionStatus === "pending" ? "pending-badge" : "connect-btn"}
              >
                {connectionStatus === "accepted"
                  ? "Connected"
                  : connectionStatus === "pending"
                  ? "Cancel Request"
                  : "Connect"}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="profile-section">
        <h2 className="section-title">About</h2>
        <p className="section-content">
          {userData.about || "This user hasn't added a bio yet."}
        </p>
      </section>

      {/* Posts */}
      <section className="profile-section">
        <h2 className="section-title">
          Posts ({userPosts.length})
        </h2>
        {userPosts.length > 0 ? (
          <div className="posts-grid">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="section-empty">No posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
