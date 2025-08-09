import Post from "../models/posts.js";

// Create a new post
export const createPost = async (req, res) => {
  const { content 

   } = req.body;

  if (!content) return res.status(400).json({ message: "Post content is required" });

  const newPost = new Post({
    content,
    author: req.user.id,
  });

  await newPost.save();
  res.status(201).json(newPost);
};

// Get all posts
export const getAllPosts = async (req, res) => {

  
  const posts = await Post.find().populate("author", "name email").sort({ createdAt: -1 });


  res.status(200).json(posts);
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
  const posts = await Post.find({ user: userId }).populate("user", "name email");
  res.status(200).json(posts);
};
