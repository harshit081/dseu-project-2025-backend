import { Request, Response, NextFunction } from "express";
import dummyUsers from "../utils/dummyData";
import { sendEmail } from "../services/email";
import generateOtp from "../services/OtpGenerator";

const getUsers = async (req: Request, res: Response) => {
  res.json([{ id: 1, name: "Alice" }]);
};

const rollNumberExist = async (req: Request, res: Response) => {
  try {
    const { rollNumber } = req.params;

    const user = dummyUsers.find((user) => user.rollNumber === rollNumber);

    if (user) {
      // Create partial email: first 3 + asterisks + last 3
      const email = user.email;
      const partialEmail =
        email.length > 6
          ? email.substring(0, 3) +
            "*".repeat(email.length - 6) +
            email.substring(email.length - 3)
          : email;

      res.status(200).json({
        exists: true,
        email: partialEmail,
      });
    } else {
      res.status(404).json({ exists: false });
    }
  } catch (error) {
    console.error("Error checking roll number:", error);
    res.status(500).json({
      success: false,
      error: "Internal server error while checking roll number",
    });
  }
};

const verifyPartialEmail = async (req: Request, res: Response) => {
  try {
    const { rollNumber, email } = req.params;

    const user = dummyUsers.find((user) => user.rollNumber === rollNumber);

    if (user) {
      const expectedEmail = user.email;

      if (email !== expectedEmail) {
        res.status(400).json({ verified: false });
      }

      // Generate OTP
      const otp = generateOtp(6, true, false);

      // Send email with OTP
      await sendEmail(
        user.name,
        expectedEmail,
        "Email Verification",
        `Your OTP for email verification is: ${otp}`
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

export { getUsers, rollNumberExist, verifyPartialEmail };
