import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState('');


  const handlePost = async () => {
    const token = localStorage.getItem("token");
  
    try {
      const res = await axios.post(
        "http://localhost:8080/api/posts",
        {
          content,
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
      setIsOpen(false);
    } catch (error) {
      if (error.response) {
        console.error("Error:", error.response.data.message);
      } else {
        console.error("Error posting:", error.message);
      }
    }
  };

  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   if (file) {
  //     setImage(URL.createObjectURL(file)); // preview image
  //   }
  // };

  return (
<>
      {/* Button to open the modal */}
      <div className="flex space-x-3">
      
        <button
          onClick={() => setIsOpen(true)}
          className="flex-1 text-left px-4 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors text-gray-600"
        >
          Start a post...
        </button>
      </div>

      {/* Modal UI */}
      {isOpen && (
        <div className="mt-4 p-4 border-t border-gray-200">
          <textarea
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {/* <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-3"
          /> */}

          {/* {image && (
            <div className="mt-3">
              <img
                src={image}
                alt="Preview"
                className="max-h-48 object-contain border rounded-lg"
              />
            </div>
          )} */}

          <div className="mt-4 flex justify-end space-x-2">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 text-sm border rounded-md hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              onClick={handlePost}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Post
            </button>
          </div>
        </div>
      )}
      </>
  );
};

export default CreatePost;
