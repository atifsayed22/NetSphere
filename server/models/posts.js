import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: [String],  // store the uploaded image URL (e.g., from Cloudinary)
    default: []
  },
  commentsCount: { type: Number, default: 0 },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }
  ],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // reference to User model
    required: true,
  }
}, { timestamps: true }); // adds createdAt and updatedAt

const Post  = mongoose.model('Post', postSchema);
export default Post;

