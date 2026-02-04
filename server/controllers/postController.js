import Post from "../models/posts.js";

// Create a new post
export const createPost = async (req, res) => {
  const { content, imageUrl } = req.body;

  // Either content or image is required
  if (!content && !imageUrl) {
    return res.status(400).json({ message: "Post content or image is required" });
  }

  const newPost = new Post({
    content: content || '',
    imageUrl: imageUrl ? [imageUrl] : [],
    author: req.user.id,
  });

  await newPost.save();
  
  // Populate author before sending response
  await newPost.populate('author', 'name email profileImage');
  
  res.status(201).json(newPost);
};

// Get all posts with pagination
export const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  const [posts, totalPosts] = await Promise.all([
    Post.find()
      .populate("author", "name email profileImage")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments()
  ]);

  res.status(200).json({
    posts,
    currentPage: page,
    totalPages: Math.ceil(totalPosts / limit),
    totalPosts,
    hasMore: page * limit < totalPosts
  });
};

// Like/Unlike post
export const toggleLikePost = async (req, res) => {
  const { postId } = req.params;
  const post = await Post.findById(postId);
  if (!post) return res.status(404).json({ message: "Post not found" });

  const userId = req.user.id;
  const alreadyLiked = post.likes.includes(userId);

  if (alreadyLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();

  res.status(200).json(post);
};

// Get posts by specific user
export const getUserPosts = async (req, res) => {
  const { userId } = req.params;
  const posts = await Post.find({ author: userId })
    .populate("author", "name email profileImage")
    .sort({ createdAt: -1 });
  res.status(200).json(posts);
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Check if the user is the owner of the post
    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: "You can only delete your own posts" });
    }

    await Post.findByIdAndDelete(postId);
    
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ message: "Server error while deleting post" });
  }
};
