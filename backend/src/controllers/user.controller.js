import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";

// Helper function to generate tokens and set cookies
const generateTokensAndRespond = async (user, req, res, message) => {
  try {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Save refresh token to user document
    user.refreshToken = refreshToken;

    // Save without triggering password middleware by marking as modified
    await user.save({ validateBeforeSave: false });

    // Remove sensitive data from user object
    const safeUser = user.toSafeObject();

    // Set cookies and send response
    res
      .status(201)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 60 * 1000, // 30 minutes
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      })
      .json({
        success: true,
        message,
        data: {
          user: safeUser,
          accessToken,
          refreshToken,
        },
      });
  } catch (error) {
    console.error("Token generation error:", error);
    throw new Error(`Token generation failed: ${error.message}`);
  }
};

// Registration Controller
export const registerUser = async (req, res) => {
    try {
        const {
            fullName,
            email,
            password,
            userType,
        } = req.body;

        // Normalize email to lowercase
        const normalizedEmail = email.toLowerCase().trim();

        // Check if user already exists with normalized email
        const existingUser = await User.findOne({
            $or: [
                { email: normalizedEmail },
            ]
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: 'User with this email or username already exists'
            });
        }

        // Create user in database
        const userData = {
            fullName,
            email: normalizedEmail,
            password,
            userType,
        };

        const user = await User.create(userData);

        if (!user) {
            return res.status(500).json({
                success: false,
                message: 'User registration failed'
            });
        }

        // await generateTokensAndRespond(user, res, 'Registration successful');
        await generateTokensAndRespond(user, req, res, 'Registration successful');

        //send registration email
        // await welcomeEmail(user);

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Internal server error during registration'
        });
    }
};

// Login Controller
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Verify password
    const isPasswordValid = await user.isPasswordCorrect(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    await generateTokensAndRespond(user, req, res, "Login successful");
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during login",
    });
  }
};

// Logout Controller
export const logoutUser = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Not authenticated",
      });
    }

    // Clear refresh token from database
    user.refreshToken = undefined;
    await user.save();

    // Clear cookies
    res.clearCookie("accessToken").clearCookie("refreshToken").json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error during logout",
    });
  }
};

// Refresh Access Token
export const refreshAccessToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Refresh token required",
      });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const user = await User.findById(decoded.id);

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    // Generate new tokens
    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    // Update refresh token in database
    user.refreshToken = newRefreshToken;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
      },
    });
  } catch (error) {
    console.error("Token refresh error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid refresh token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Refresh token expired",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error during token refresh",
    });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      // For security, don't reveal if user exists or not
      return res.status(200).json({
        success: true,
        message:
          "If an account with that email exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");
    user.resetPasswordTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour

    await user.save();

    const url = `${
      process.env.FRONTEND_URL || "http://localhost:3000"
    }/reset-password?token=${resetToken}`;

    // Uncomment when email service is ready
    // const emailSent = await resetPasswordEmail(user.email, url);
    // if (!emailSent) {
    //     user.resetPasswordToken = null;
    //     user.resetPasswordTokenExpiry = null;
    //     await user.save();
    //     return res.status(500).json({ success: false, message: 'Could not send email' });
    // }

    console.log(`Password reset URL: ${url}`); // Remove this in production

    return res.status(200).json({
      success: true,
      message:
        "If an account with that email exists, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Token and new password are required",
      });
    }

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token is invalid or has expired",
      });
    }

    // Update password
    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiry = undefined;

    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to reset password",
    });
  }
};
