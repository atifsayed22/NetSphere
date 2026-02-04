import React, { useState } from 'react';
import axios from 'axios';
import { FiImage, FiX } from 'react-icons/fi';
import BASE_URL from '../config';

const CreatePost = ({ onPostCreated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPosting, setIsPosting] = useState(false);

  const handlePost = async () => {
    if (!content.trim() && !image) return;
    
    const token = localStorage.getItem("token");
    setIsPosting(true);
  
    try {
      const res = await axios.post(
       `${BASE_URL}/api/posts`,
        {
          content,
          imageUrl: image, // base64 image
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log("Post created:", res.data);
  
      // Reset state
      setContent('');
      setImage(null);
      setImagePreview(null);
      setIsOpen(false);
      
      // Notify parent to refresh posts
      if (onPostCreated) {
        onPostCreated();
      }
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else {
        console.error("Error posting:", error.message);
      }
    } finally {
      setIsPosting(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      
      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  return (
<>
      {/* Button to open the modal */}
      <div className="create-post-trigger">
      
        <button
          onClick={() => setIsOpen(true)}
          className="create-post-btn"
        >
          Start a post...
        </button>
      </div>

      {/* Modal UI */}
      {isOpen && (
        <div className="create-post-modal">
          <textarea
            rows={4}
            className="create-post-textarea"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {/* Image Preview */}
          {imagePreview && (
            <div className="image-preview-container">
              <img
                src={imagePreview}
                alt="Preview"
                className="image-preview"
              />
              <button
                onClick={removeImage}
                className="remove-image-btn"
              >
                <FiX size={16} />
              </button>
            </div>
          )}

          <div className="create-post-actions">
            {/* Image Upload Button */}
            <label className="image-upload-btn">
              <FiImage size={20} />
              <span>Photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            <div className="profile-edit-actions">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setContent('');
                  setImage(null);
                  setImagePreview(null);
                }}
                className="cancel-btn"
              >
                Cancel
              </button>
              <button
                onClick={handlePost}
                disabled={isPosting || (!content.trim() && !image)}
                className="post-submit-btn"
              >
                {isPosting ? 'Posting...' : 'Post'}
              </button>
            </div>
          </div>
        </div>
      )}
      </>
  );
};

export default CreatePost;
