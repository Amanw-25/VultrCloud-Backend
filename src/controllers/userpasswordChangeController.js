import UserModel from "../models/usermodel.js";

const userPasswordChangeController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid user",
      });
    }


    user.password = password;
    await user.save();

    return res.status(200).json({
      status: "success",
      message: "Password changed successfully",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).json({
      status: "failed",
      message: "Password changing failed",
    });
  }
};

export default userPasswordChangeController;
