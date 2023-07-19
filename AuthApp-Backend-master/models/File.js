const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  imageUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

fileSchema.post("save", async function (doc) {
  try {
    console.log("doc", doc);
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });
    let info = await transporter.sendMail({
      from: `Kawaviraj`,
      to: doc.email,
      subject: "New file uploaded on cloudinary",
      html: `<h2>Hello Ji</h2> <p>File Uploaded successfully</p>`,
    });

    console.log("INFO", info);
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;
