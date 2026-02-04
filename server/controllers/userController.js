import User from "../models/users.js";

// GET - Get current user's profile
export const getUserProfile = async (req, res) => {
  try {
    // req.userId comes from the authentication middleware
    const user = await User.findById(req.userId)
      .select('-password') // Exclude password from response
      .populate('connections', 'name profileImage');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      message: 'Server error while fetching profile' 
    });
  }
};

// PUT - Update current user's profile
export const updateUserProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const updateData = { ...req.body };

    // Remove sensitive fields
    delete updateData.password;
    delete updateData.email;
    delete updateData.connections;

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error while updating profile' });
  }
};


// GET - Get user profile by ID (for viewing other users)
export const getUserProfileById = async (req, res) => {
  try {
    const { userId } = req.params;
    
    const user = await User.findById(userId)
      .select('-password -email') // Don't send sensitive data for public view
      .populate('connections', 'name profileImage');

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    res.status(200).json({
      message: 'Profile fetched successfully',
      user: user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ 
      message: 'Server error while fetching profile' 
    });
  }
};

