import UserModel from "../models/usermodel.js";
import generateTokens from "../utils/generateTokens.js";
import setTokenscookies from "../utils/setTokenscookies.js";

const userloginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    const isMatchPassword = await user.isPasswordCorrect(password);

    if (!isMatchPassword) {
      return res.status(401).json({
        status: "failed",
        message: "Invalid email or password",
      });
    }

    // GENERATE TOKENS
    const { accessToken, refreshToken } = await generateTokens(user._id);

    // Set isAuthenticated to true
    user.isAuthenticated = true;
    await user.save();

    // Send cookies
    setTokenscookies(res, accessToken, refreshToken);

    res.cookie("isUserAuthenticated", user.isAuthenticated, {
      httpOnly: false,
      secure: false,
      domain: ".nxtdev.in",
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Response after successful login
    res.status(200).json({
      status: "success",
      message: "User login successful",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: `Unable to login! ${error.message}`,
    });
  }
};

export default userloginController;
