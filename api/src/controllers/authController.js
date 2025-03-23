const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ $or: [{ email }, { username }] });
    
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create new user
    const user = await User.create({
      username,
      email,
      password
    });
    
    // Generate token
    const token = generateToken(user._id);
    
    res.status(201).json({
      user: user.getPublicProfile(),
      token
    });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error: error.message });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find user
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await user.isValidPassword(password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user._id);
    
    res.json({
      user: user.getPublicProfile(),
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    res.json(req.user.getPublicProfile());
  } catch (error) {
    res.status(500).json({ message: 'Error getting user profile', error: error.message });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, bio, profilePicture } = req.body;
    
    // Check if username is taken by another user
    if (username && username !== req.user.username) {
      const userExists = await User.findOne({ username });
      if (userExists) {
        return res.status(400).json({ message: 'Username already taken' });
      }
    }
    
    // Check if email is taken by another user
    if (email && email !== req.user.email) {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    
    // Update fields
    if (username) req.user.username = username;
    if (email) req.user.email = email;
    if (bio !== undefined) req.user.bio = bio;
    if (profilePicture) req.user.profilePicture = profilePicture;
    
    await req.user.save();
    
    res.json(req.user.getPublicProfile());
  } catch (error) {
    res.status(400).json({ message: 'Error updating profile', error: error.message });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Check current password
    const isMatch = await req.user.isValidPassword(currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    req.user.password = newPassword;
    await req.user.save();
    
    res.json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error changing password', error: error.message });
  }
};