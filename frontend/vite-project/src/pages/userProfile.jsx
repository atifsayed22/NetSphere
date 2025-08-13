import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PostCard from "../components/PostCard";

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
  

  const fetchUserData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/user/profile/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserData(res.data.user || null);
      setUserPosts(Array.isArray(res.data.posts) ? res.data.posts : []);
    } catch (err) {
      console.error("Error fetching user profile:", err);
      setUserData(null);
      setUserPosts([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchUserData().then(() => {
      fetchConnectionStatus().finally(() => setLoading(false));
    });
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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="max-w-4xl mx-auto text-center py-16">
        <p className="text-red-600">Failed to load profile. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-48 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500">
          <img src={userData.bannerImage} className="h-48 w-full object-cover"alt="" />
        </div>

        <div className="relative px-6 pb-6">
          <div className="absolute -top-16 left-6">
            <div className="h-32 w-32 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
              <img
                src={userData.profileImage || "/default-profile.jpg"}
                alt="Profile"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
          </div>

          <div className="mt-4 ml-36">
            <h1 className="text-3xl font-bold text-gray-900">{userData.name}</h1>
            <p className="text-gray-600 mt-1">{userData.email}</p>
            {userData.bio && <p className="text-gray-700 leading-relaxed mt-2">{userData.bio}</p>}

            {currentUserId !== userId && (
              <button
                onClick={handleConnectionAction}
                disabled={connectionStatus === "accepted"}
                className={`mt-4 px-4 py-2 text-sm font-medium rounded-md transition-all ${
                  connectionStatus === "accepted"
                    ? "bg-gray-200 text-gray-800 cursor-not-allowed"
                    : connectionStatus === "pending"
                    ? "bg-yellow-500 text-white hover:bg-yellow-600"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
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

      {/* Education */}
      {userData.education?.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Education</h2>
          {userData.education.map((edu, i) => (
            <div key={i} className="mb-3">
              <h3 className="text-lg font-semibold text-gray-900">{edu.school}</h3>
              <p className="text-gray-600">
                {edu.degree} in {edu.fieldOfStudy}
              </p>
              <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                <span>📅</span>
                <span>
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {userData.experience?.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Experience</h2>
          <ul className="space-y-3">
            {userData.experience.map((exp, i) => (
              <li key={i} className="text-gray-700">
                <strong>{exp.position}</strong> at {exp.company} ({exp.duration})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Skills */}
      {userData.skills?.length > 0 && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {userData.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Posts */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Posts</h2>
        {userPosts.length > 0 ? (
          <div className="space-y-4">
            {userPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet.</p>
        )}
      </section>
    </div>
  );
};

export default UserProfile;
