
import User from "../models/users.js";
import bcrypt  from 'bcryptjs'
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
  try {
    const { name, email, about,password, skills, experience,education } = req.body;

      // Check if user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "User already exists" });
      }

      // Hash password
      const hashPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({
        name,
        email,
        about,
        password: hashPassword,
        skills,
        experience,
        education
      });

      await newUser.save();

      // Respond with success
      return res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
      console.error("Error in registration:", error);
      return res.status(500).json({ message: "Server error" });
  }
};
export const login = async(req,res)=>{
    const {email, password} = req.body

    const user  = await User.findOne({email})
    if(!user) return res.status(404).json({message:"User not Found "})

    const isMatch = bcrypt.compare(password,user.password)

    if(!isMatch) return res.status(404).json({message:"Invalid Credential"})


    // generate jwt(jason web token )

    const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

     res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
        
}