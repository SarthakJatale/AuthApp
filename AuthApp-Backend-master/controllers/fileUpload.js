const File = require("../models/File");
const cloudinary = require("cloudinary").v2;

exports.localFileUpload = async (req, res) => {
  try {
    const file = req.files.file;
    console.log("File's content", file);
    let path =
      __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`;
    file.mv(path, (error) => {
      console.log(error);
    });
    res.json({
      success: true,
      message: "Local file uploaded successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
function isFileTypeSupported(type, supportedTypes) {
  return supportedTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality) {
  const options = { folder };
  if (quality) {
    options.quality = quality;
  }
  options.resource_type = "auto";
  return await cloudinary.uploader.upload(file.tempFilePath, options);
}
exports.imageUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.imageFile;
    console.log(file);

    // validation
    const supportedTypes = ["jpg", "jpeg", "png"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //is file supported ?
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message: "file is not supported",
      });
    }
    //file supported->
    const response = await uploadFileToCloudinary(file, "KawaVirajDemo");
    console.log(response);
    // save entry in db

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "Image Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};
exports.videoUpload = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //is file supported ?
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message:
          "video is not supported, please upload file with following extensions. Extension is .mp4 and .mov",
      });
    }
    //file supported->
    const response = await uploadFileToCloudinary(file, "KawaVirajDemo");
    console.log(response);
    // save entry in db

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "video Successfully Uploaded",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ success: false, message: "Something went wrong" });
  }
};

exports.imageSizeReducer = async (req, res) => {
  try {
    //data fetch
    const { name, tags, email } = req.body;
    console.log(name, tags, email);

    const file = req.files.videoFile;
    // validation
    const supportedTypes = ["mp4", "mov"];
    const fileType = file.name.split(".")[1].toLowerCase();

    //is file supported ?
    if (!isFileTypeSupported(fileType, supportedTypes)) {
      return res.status(400).json({
        success: false,
        message:
          "video is not supported, please upload file with following extensions. Extension is .mp4 and .mov",
      });
    }
    //file supported->
    const response = await uploadFileToCloudinary(file, "KawaVirajDemo",90);
    console.log(response);
    // save entry in db

    const fileData = await File.create({
      name,
      tags,
      email,
      imageUrl: response.secure_url,
    });

    res.json({
      success: true,
      imageUrl: response.secure_url,
      message: "video Successfully Uploaded",
    });
  } catch (error) {}
};
