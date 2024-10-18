const userlogoutController = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.clearCookie("isUserAuthenticated");

    res.status(200).json({
      status: "success",
      message: "Logout successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: "failed",
      message: "Unable to Logout ! ",
    });
  }
};

export default userlogoutController;
