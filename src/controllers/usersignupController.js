import UserModel from "../models/usermodel.js";

const usersignupController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // PASSWORD CONFIRMATION CHECK
    if (password !== confirmPassword) {
      return res.status(400).json({
        status: "failed",
        message: "Password and confirm password do not match!",
      });
    }

    // CHECKING EXISTING USER BY EMAIL
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return res.status(409).json({
        status: "failed",
        message: "Email already registered!",
      });
    }

    // CREATING NEW USER
    const createdUser = await UserModel.create({
      username,
      email,
      password,
    });

    // SELECTING FIELDS TO RETURN (REMOVING SENSITIVE INFO)
    const newUser = await UserModel.findById(createdUser._id).select(
      "-password -createdAt -updatedAt -__v"
    );

    return res.status(200).json({
      status: "success",
      message: "Registration successful!",
      user: newUser,
    });
  } catch (error) {
    return res.status(500).json({
      status: "failed",
      message: `Unable to register: ${error}`,
    });
  }
};

export default usersignupController;
