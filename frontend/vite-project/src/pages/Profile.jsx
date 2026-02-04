import React, { useState, useEffect } from "react";
import { FiEdit, FiCamera } from "react-icons/fi";
import axios from "axios";
import BASE_URL from "../config";
import PostCard from "../components/PostCard";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});
  const [userPosts, setUserPosts] = useState([]);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserProfile();
    fetchUserPosts();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const userId = localStorage.getItem("userId");

      const response = await axios.get(
        `${BASE_URL}/api/user/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCurrentUser(response.data.user);
      setEditForm(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      const fallbackUser = {
        name: "User",
        about: "",
        connections: [],
      };
      setCurrentUser(fallbackUser);
      setEditForm(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserPosts = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
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

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(currentUser);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((prev) => ({
          ...prev,
          profileImage: reader.result, // Base64 preview
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${BASE_URL}/api/user/profile`,
        editForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const updatedUser = response.data.user;
      setCurrentUser(updatedUser);
      setEditForm(updatedUser);
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
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

  const handlePostDelete = (postId) => {
    setUserPosts((prev) => prev.filter((p) => p._id !== postId));
  };

  if (loading) {
    return (
      <div className="profile-container">
        <div className="profile-loading">
          <div className="spinner-blue"></div>
          <span className="profile-loading-text">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="profile-container">
        <div className="profile-error">
          <p className="profile-error-text">
            Failed to load profile. Please try again.
          </p>
          <button
            onClick={fetchUserProfile}
            className="retry-btn"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-container">
      {/* Profile Header */}
      <div className="profile-card">
        {/* Banner */}
        <div className="profile-banner"></div>

        {/* Profile Picture & Info */}
        <div className="profile-info-section">
          <div className="profile-avatar-container">
            {isEditing ? (
              <label className="profile-avatar-edit">
                {editForm.profileImage ? (
                  <img
                    src={editForm.profileImage}
                    alt={editForm.name}
                    className="profile-avatar"
                  />
                ) : (
                  <div className="profile-avatar-placeholder">
                    <span>
                      {getInitials(editForm.name)}
                    </span>
                  </div>
                )}
                <div className="profile-avatar-overlay">
                  <FiCamera />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            ) : currentUser.profileImage ? (
              <img
                src={currentUser.profileImage}
                alt={currentUser.name}
                className="profile-avatar"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                <span>
                  {getInitials(currentUser.name)}
                </span>
              </div>
            )}
          </div>

          {/* Edit / Save Buttons */}
          <div className="profile-actions">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="edit-profile-btn"
              >
                <FiEdit />
                <span>Edit Profile</span>
              </button>
            ) : (
              <div className="profile-edit-actions">
                <button
                  onClick={handleCancelEdit}
                  className="cancel-btn"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="save-btn"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="profile-details">
            {!isEditing ? (
              <>
                <h1 className="profile-name">
                  {currentUser.name}
                </h1>
                <p className="profile-email">
                  {currentUser.email}
                </p>
                <div className="profile-stats">
                  <span>{currentUser.connections?.length || 0} connections</span>
                  <span>{userPosts.length} posts</span>
                </div>
              </>
            ) : (
              <div className="profile-edit-form">
                <div className="form-group">
                  <label className="form-label">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleInputChange}
                    className="form-input"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="profile-section">
        <h2 className="section-title">About</h2>
        {!isEditing ? (
          <p className="section-content">
            {currentUser.about || "No bio yet. Click Edit Profile to add one!"}
          </p>
        ) : (
          <textarea
            name="about"
            value={editForm.about || ""}
            onChange={handleInputChange}
            rows={4}
            className="form-textarea"
            placeholder="Tell us about yourself..."
          />
        )}
      </section>

      {/* My Posts Section */}
      <section className="profile-section">
        <h2 className="section-title">
          My Posts ({userPosts.length})
        </h2>
        {userPosts.length > 0 ? (
          <div className="posts-grid">
            {userPosts.map((post) => (
              <PostCard 
                key={post._id} 
                post={post} 
                onDelete={handlePostDelete}
              />
            ))}
          </div>
        ) : (
          <p className="section-empty">You haven't posted anything yet.</p>
        )}
      </section>
    </div>
  );
};

export default Profile;
