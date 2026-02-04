import mongoose from 'mongoose'


const postSchema = new mongoose.Schema({
  content: {
    type: String,
    default: '',
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

// Indexes for better query performance
postSchema.index({ createdAt: -1 }); // For sorting posts by date
postSchema.index({ author: 1, createdAt: -1 }); // For fetching user's posts

const Post  = mongoose.model('Post', postSchema);
export default Post;

