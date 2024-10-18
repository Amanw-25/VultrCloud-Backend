import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import Jwt from 'jsonwebtoken';
import { appconfig } from '../config/appconfig.js';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    isAuthenticated: {
      type: Boolean,
      default: false,
    },
    roles: {
      type: [String],
      default: ['user'],
    },
    profilePhoto: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

// Hash the password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Method to generate an access token
userSchema.methods.generateAccessToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      email: this.email,
      roles: this.roles,
      profilePhoto: this.profilePhoto,
    },
    appconfig.ACCESS_TOKEN_KEY,
    {
      expiresIn: appconfig.ACCESS_TOKEN_EXP,
    }
  );
};

// Method to generate a refresh token
userSchema.methods.generateRefreshToken = function () {
  return Jwt.sign(
    {
      _id: this._id,
      roles: this.roles,
    },
    appconfig.REFRESH_TOKEN_KEY,
    {
      expiresIn: appconfig.REFRESH_TOKEN_EXP,
    }
  );
};

// Check if the model already exists
const UserModel = mongoose.models.User || mongoose.model('User', userSchema);

export default UserModel;
