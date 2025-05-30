import { Request, Response, NextFunction, RequestHandler } from "express";
import dummyUsers from "../utils/dummyData";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/email";
import generateOtp from "../services/OtpGenerator";

// Verify OTP for a user
const verifyOtp: RequestHandler = async (req, res) => {
  try {
    const { rollNumber, otp } = req.body;
    if (!rollNumber || !otp) {
      res
        .status(400)
        .json({ success: false, message: "rollNumber and otp are required" });
      return;
    }
    const user = dummyUsers.find((u) => u.rollNumber === rollNumber);
    if (!user || !user.otp || !user.otpExpiresAt) {
      res.status(404).json({
        success: false,
        message: "OTP not found. Please request a new one.",
      });
      return;
    }
    if (Date.now() > user.otpExpiresAt) {
      user.otp = undefined;
      user.otpExpiresAt = undefined;
      res.status(400).json({
        success: false,
        message: "OTP expired. Please request a new one.",
      });
      return;
    }
    if (user.otp !== otp) {
      res.status(400).json({ success: false, message: "Invalid OTP." });
      return;
    }
    // OTP is valid
    user.otp = undefined;
    user.otpExpiresAt = undefined;
    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully." });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Set password for a user by roll number
const setPassword: RequestHandler = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    if (!rollNumber || !password) {
      res.status(400).json({
        success: false,
        message: "rollNumber and password are required",
      });
      return;
    }
    const user = dummyUsers.find((u) => u.rollNumber === rollNumber);
    if (!user) {
      res.status(404).json({ success: false, message: "User not found" });
      return;
    }
    // Hash the password before storing
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    res
      .status(200)
      .json({ success: true, message: "Password set successfully" });
  } catch (error) {
    console.error("Set password error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// Login API: verifies rollNumber and password, returns JWT if valid
const login: RequestHandler = async (req, res) => {
  try {
    const { rollNumber, password } = req.body;
    if (!rollNumber || !password) {
      res.status(400).json({
        success: false,
        message: "rollNumber and password are required",
      });
      return;
    }
    const user = dummyUsers.find((u) => u.rollNumber === rollNumber);
    if (!user) {
      res
        .status(401)
        .json({ success: false, message: "Invalid rollNumber or password" });
      return;
    }
    // Compare password using bcrypt
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res
        .status(401)
        .json({ success: false, message: "Invalid rollNumber or password" });
      return;
    }
    // Create JWT
    const token = jwt.sign(
      { rollNumber: user.rollNumber, name: user.name, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1h" }
    );
    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const rollNumberExist: RequestHandler = async (req: Request, res: Response) => {
  try {
    const { rollNumber } = req.params;

    const user = dummyUsers.find((user) => user.rollNumber === rollNumber);
    if (user) {
      // Create partial email: if local part (before @) > 6, show first 2 and last 2 chars before @, mask the rest
      const email = user.email;
      const [local, domain] = email.split("@");
      // const isVerified = user.isVerified;
      let partialEmail = email;
      if (local.length > 6) {
        partialEmail =
          local.substring(0, 2) +
          "*".repeat(local.length - 4) +
          local.substring(local.length - 2) +
          "@" +
          domain;
      }
      const data = {
        rollNumber: user.rollNumber,
        email: partialEmail,
        // isVerified: isVerified,
        name: user.name,
      };
      // console.log("Roll number exists:", data);
      res.status(200).json(data);
      return;
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    // console.error("Error checking roll number:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while checking roll number",
    });
  }
};

const verifyPartialEmail: RequestHandler = async (
  req: Request,
  res: Response
) => {
  try {
    const { rollNumber, email } = req.params;
    console.log("Verifying email for roll number:", rollNumber, "with email:", email);
    const user = dummyUsers.find((user) => user.rollNumber === rollNumber);
    console.log(user);
    if (user) {
      const expectedEmail = user.email;

      if (email !== expectedEmail) {
        res.status(400).json({ verified: false });
        return;
      }

      // Generate OTP
      const otp = generateOtp(6, true, false);
      // Store OTP and expiry (2 minutes from now)
      user.otp = otp;
      user.otpExpiresAt = Date.now() + 2 * 60 * 1000;

      // Send email with OTP
      await sendEmail(
        user.name,
        expectedEmail,
        "Email Verification",
        `Hello ${user.name},\n\nYour OTP for email verification is: ${otp}\n\nIf you did not request this, please ignore this email.\n\nThanks,\nDSEU Team`
      );

      // Respond with success
      res.status(200).json({
        verified: true,
        message: "OTP sent to your email for verification",
      });
    } else {
      res.status(400).json({ verified: false });
    }
  } catch (error) {
    console.error("Error verifying partial email:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while verifying partial email",
    });
  }
};

export { rollNumberExist, verifyPartialEmail, login, setPassword, verifyOtp };
