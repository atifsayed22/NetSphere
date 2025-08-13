import User from "../models/users.js";

// GET - Get current user's profile
export const getUserProfile = async (req, res) => {
  try {
    // req.userId comes from the authentication middleware
    const user = await User.findById(req.userId)
      .select('-password') // Exclude password from response
      .populate('connections', 'name headline profileImage')
      .populate('followers', 'name headline profileImage')
      .populate('following', 'name headline profileImage');

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

    console.log("Updating profile for user:", userId);
    console.log(updateData)

    // Remove sensitive fields
    delete updateData.password;
    delete updateData.email;
    delete updateData.connections;
    delete updateData.followers;
    delete updateData.following;

    // Handle experience array if provided
    if (updateData.experience) {
      updateData.experience = updateData.experience.map(exp => ({
        position: exp.position || '',
        company: exp.company || '',
        duration: exp.duration || ''
      }));
    }

    // Handle uploaded images (from multer-storage-cloudinary)
    if (req.file?.profileImage) {
      console.log(req.files.profileImage[0].path)
      updateData.profileImage = req.files.profileImage[0].path; // Cloudinary URL
    }
    if (req.file?.bannerImage) {

      console.log(req.files.bannerImage[0].path)
      updateData.bannerImage = req.files.bannerImage[0].path; // Cloudinary URL
    }

    // Update user in DB
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    console.log(updatedUser)
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
      
      .populate('followers', 'name headline profileImage')
      .populate('following', 'name headline profileImage');

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

