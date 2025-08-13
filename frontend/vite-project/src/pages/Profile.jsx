import React, { useState, useEffect } from "react";
import { FiEdit, FiMapPin, FiCalendar } from "react-icons/fi";
import { FaUniversity, FaBuilding } from "react-icons/fa";
import axios from "axios";
import BASE_URL from "../config";

const Profile = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  const [profileImageFile, setProfileImageFile] = useState(null);
  const [bannerImageFile, setBannerImageFile] = useState(null);

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserProfile();
  }, []);
  const handleImageChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm((prev) => ({
          ...prev,
          [field]: reader.result, // preview image before saving
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // const handleImageUpload = async (e, field) => {
  //   const file = e.target.files[0];
  //   if (!file) return;

  //   const formData = new FormData();
  //   formData.append("image", file);

  //   try {
  //     const token = localStorage.getItem("token");
  //     const res = await axios.post(
  //       "http://localhost:8080/api/user/upload",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "multipart/form-data",
  //         },
  //       }
  //     );
  //     setEditForm((prev) => ({ ...prev, [field]: res.data.url }));
  //   } catch (err) {
  //     console.error("Upload failed:", err);
  //   }
  // };

  const fetchUserProfile = async () => {
    try {
      // Get user ID from localStorage or token
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
      console.log(response.data);

      setCurrentUser(response.data.user);
      setEditForm(response.data.user);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Fallback to default data if API fails
      const fallbackUser = {
        name: "Alex Johnson",
        title: "Senior Software Engineer",
        company: "Tech Solutions Inc.",
        location: "San Francisco, CA",
        connections: 847,
        about:
          "Passionate software engineer with 8+ years of experience in full-stack development. Love building scalable applications and mentoring junior developers.",
        experience: [
          {
            position: "Senior Software Engineer",
            company: "Tech Solutions Inc.",
            duration: "2021 - Present",
          },
        ],
      };
      setCurrentUser(fallbackUser);
      setEditForm(fallbackUser);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditForm(currentUser); // Reset form to original data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleBannerChange = (e) => {
    setBannerImage(e.target.files[0]);
  };

  // Send to backend
  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (profileImageFile) formData.append("profileImage", profileImageFile);
      if (bannerImageFile) formData.append("bannerImage", bannerImageFile);
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

      const updatedUser = response.data.user; // ✅ correctly extract user object

      setCurrentUser(updatedUser);
      setEditForm(updatedUser); // ✅ sync editForm too
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  const addExperience = () => {
    setEditForm((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { position: "", company: "", duration: "" },
      ],
    }));
  };

  const updateExperience = (index, field, value) => {
    setEditForm((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? { ...exp, [field]: value } : exp
      ),
    }));
  };

  const removeExperience = (index) => {
    setEditForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading profile...</span>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <p className="text-red-600">
            Failed to load profile. Please try again.
          </p>
          <button
            onClick={fetchUserProfile}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Banner */}
        <div className="relative">
          <img
            src={
              currentUser.bannerImage ||
              "https://images.unsplash.com/photo-1504805572947-34fad45aed93?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt="Banner"
            className="h-48 w-full object-fit"
          />

          {/* overlay */}
        </div>

        {/* Profile Picture */}
        <div className="relative px-6 pb-6">
          <div className="absolute -top-16 left-6">
            
            <img
              src={
               currentUser.profileImage? currentUser.profileImage : "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1950&q=80"
              }
              alt={currentUser.name}
              className="h-32 w-32 rounded-full border-4 border-white shadow-lg object-cover"
            />
          </div>

          {/* Edit / Save Buttons */}
          <div className="flex justify-end pt-4">
            {!isEditing ? (
              <button
                onClick={handleEditClick}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FiEdit className="text-gray-600" />
                <span className="font-medium">Edit Profile</span>
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancelEdit}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveProfile}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="mt-4 ml-36">
            {!isEditing ? (
              <>
                <h1 className="text-3xl font-bold text-gray-900">
                  {currentUser.name}
                </h1>
                <p className="text-xl text-gray-600 mt-1">
                  {currentUser.title}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <FiMapPin className="text-gray-600" />
                    <span>{currentUser.location}</span>
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={editForm.name || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Title */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div> */}

                {/* Company */}
                {/* <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={editForm.company || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div> */}

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={editForm.location || ""}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Profile Picture Upload */}
                { <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Picture
                  </label>
                  <input
                    type="file"
                    name="profileImage"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "profileImage")}
                    className="w-full"
                  />
                </div> }

                {/* Banner Image Upload */}
                { <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Banner Image
                  </label>
                  <input
                    type="file"
                    name="bannerImage"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, "bannerImage")}
                    className="w-full"
                  />
                </div> }
              </div>
            )}
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
        {!isEditing ? (
          <p className="text-gray-700 leading-relaxed">{currentUser.about}</p>
        ) : (
          <textarea
            name="about"
            value={editForm.about || ""}
            onChange={handleInputChange}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Tell us about yourself..."
          />
        )}
      </section>

      {/* Education Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Education</h2>
          {isEditing && (
            <button
              onClick={() =>
                setEditForm((prev) => ({
                  ...prev,
                  education: [
                    ...(prev.education || []),
                    {
                      school: "",
                      degree: "",
                      fieldOfStudy: "",
                      startYear: "",
                      endYear: "",
                    },
                  ],
                }))
              }
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Education
            </button>
          )}
        </div>

        <div className="space-y-6">
          {(editForm.education || []).map((edu, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">
                    <FaUniversity className="text-gray-600" />
                  </span>
                </div>
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {edu.degree} in {edu.fieldOfStudy}
                    </h3>
                    <p className="text-gray-600">{edu.school}</p>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <span>
                        <FiCalendar className="text-gray-500" />
                      </span>
                      <span>
                        {edu.startYear} – {edu.endYear}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Degree"
                      value={edu.degree || ""}
                      onChange={(e) =>
                        setEditForm((prev) => {
                          const newEdu = [...prev.education];
                          newEdu[index].degree = e.target.value;
                          return { ...prev, education: newEdu };
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Field of Study"
                      value={edu.fieldOfStudy || ""}
                      onChange={(e) =>
                        setEditForm((prev) => {
                          const newEdu = [...prev.education];
                          newEdu[index].fieldOfStudy = e.target.value;
                          return { ...prev, education: newEdu };
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="School"
                      value={edu.school || ""}
                      onChange={(e) =>
                        setEditForm((prev) => {
                          const newEdu = [...prev.education];
                          newEdu[index].school = e.target.value;
                          return { ...prev, education: newEdu };
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Start Year"
                        value={edu.startYear || ""}
                        onChange={(e) =>
                          setEditForm((prev) => {
                            const newEdu = [...prev.education];
                            newEdu[index].startYear = e.target.value;
                            return { ...prev, education: newEdu };
                          })
                        }
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="End Year"
                        value={edu.endYear || ""}
                        onChange={(e) =>
                          setEditForm((prev) => {
                            const newEdu = [...prev.education];
                            newEdu[index].endYear = e.target.value;
                            return { ...prev, education: newEdu };
                          })
                        }
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <button
                      onClick={() =>
                        setEditForm((prev) => ({
                          ...prev,
                          education: prev.education.filter(
                            (_, i) => i !== index
                          ),
                        }))
                      }
                      className="mt-2 px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Experience</h2>
          {isEditing && (
            <button
              onClick={addExperience}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Experience
            </button>
          )}
        </div>

        <div className="space-y-6">
          {(editForm.experience || []).map((exp, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-shrink-0">
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600">
                    <FaBuilding className="text-gray-600" />
                  </span>
                </div>
              </div>
              <div className="flex-1">
                {!isEditing ? (
                  <>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {exp.position}
                    </h3>
                    <p className="text-gray-600">{exp.company}</p>
                    <div className="flex items-center space-x-1 mt-1 text-sm text-gray-500">
                      <span>
                        <FiCalendar className="text-gray-500" />
                      </span>
                      <span>{exp.duration}</span>
                    </div>
                  </>
                ) : (
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Position"
                      value={exp.position || ""}
                      onChange={(e) =>
                        updateExperience(index, "position", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Company"
                      value={exp.company || ""}
                      onChange={(e) =>
                        updateExperience(index, "company", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Duration (e.g., 2021 - Present)"
                        value={exp.duration || ""}
                        onChange={(e) =>
                          updateExperience(index, "duration", e.target.value)
                        }
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button
                        onClick={() => removeExperience(index)}
                        className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Skills</h2>
          {isEditing && (
            <button
              onClick={() =>
                setEditForm((prev) => ({
                  ...prev,
                  skills: [...(prev.skills || []), ""],
                }))
              }
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              + Add Skill
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-2">
          {!isEditing
            ? currentUser.skills?.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            : (editForm.skills || []).map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) =>
                      setEditForm((prev) => {
                        const newSkills = [...prev.skills];
                        newSkills[index] = e.target.value;
                        return { ...prev, skills: newSkills };
                      })
                    }
                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={() =>
                      setEditForm((prev) => ({
                        ...prev,
                        skills: prev.skills.filter((_, i) => i !== index),
                      }))
                    }
                    className="px-2 py-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                  >
                    Remove
                  </button>
                </div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
