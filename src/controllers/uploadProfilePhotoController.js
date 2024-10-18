import cloudinary from "../config/cloudinaryConfig.js";

export const uploadProfilePhotoController = async (req, res) => {
  try {
    const { user } = req;
    const file = req.file;
    console.log("🚀 ~ uploadProfilePhotoController ~ file:", file);

    if (!file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    cloudinary.v2.uploader
      .upload_stream(
        {
          folder: "profile_photos",
          public_id: user._id.toString(),
          overwrite: true,
        },
        async (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            return res.status(500).json({ error: "Image upload failed" });
          }

          user.profilePhoto = result.secure_url;
          await user.save();

          res.status(200).json({
            message: "Profile photo uploaded successfully",
            profilePhoto: user.profilePhoto,
          });
        }
      )
      .end(file.buffer);
  } catch (error) {
    console.error("Server Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};
