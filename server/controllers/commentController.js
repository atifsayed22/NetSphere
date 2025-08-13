import Comment from "../models/Comments.js";
import Post from "../models/posts.js";

// Add a comment
export const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    const { postId } = req.params;

    console.log("comment route triggered!!")
    console.log(postId)
    console.log(content)
    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Comment content is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const newComment =  new Comment({
      user: req.user.id, // assuming you have auth middleware
      post: postId,
      content: content.trim(),
    });

    // Optional: push comment id to post's comments array if you store them in Post
    await newComment.save()

    post.commentsCount += 1;
    await post.save();


    const populatedComment = await newComment.populate("user", "name email");

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment,
      commentsCount: post.commentsCount, 
    });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get comments for a post
export const getComments = async (req, res) => {
  try {
    const { postId } = req.params;
    console.log("fetcing commetn ")
    console.log(postId)

    const comments = await Comment.find({ post: postId })
      .populate("user", "name email")
      .sort({ createdAt: 1 }); // oldest first

      console.log(comments)

    res.status(200).json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Server error" });
  }
};
