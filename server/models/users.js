import express from 'express'
import mongoose from 'mongoose'


const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
 
  
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  profileImage: {
    type: String // URL or path
  },
  bannerImage: {
    type: String
  },
  location: String,
  about: String,
  education: [{
    school: String,
    degree: String,
    fieldOfStudy: String,
    startYear: String,
    endYear: String,
  }],
  experience: [
    {
      position: { type: String, default: '' },
      company: { type: String, default: '' },
      duration: { type: String, default: '' }
    }
  ],
  
  skills: [String],
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  connections: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
}, {
  timestamps: true
});

const User = mongoose.model('User', userSchema);
export default User;
