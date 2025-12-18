import { model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new Schema(
  {
    // Basic Info
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: true,
    },

    // User Type
    userType: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      required: true,
    },

    // Tokens
    refreshToken: {
      type: String,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  { timestamps: true }
);

// Index for better query performance
userSchema.index({ userType: 1, email: 1 });

// Pre-save middleware for password hashing
userSchema.pre("save", async function () {
  // Only hash if password is modified
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to validate password
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Token generation methods
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      userType: this.userType,
    },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d",
  });
};

userSchema.methods.generateResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  return resetToken;
};

// Method to get user data without sensitive information
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.refreshToken;
  delete userObject.resetPasswordToken;
  delete userObject.resetPasswordTokenExpiry;
  delete userObject.emailVerificationToken;
  delete userObject.emailVerificationExpiry;
  return userObject;
};

const User = model("User", userSchema);

export default User;
