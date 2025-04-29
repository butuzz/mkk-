import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.uploadDir = "./public/uploads";
  form.keepExtensions = true;

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: "Image upload failed." });
    }

    const filePath = files.image[0].path;
    res.status(200).json({ message: "Image uploaded successfully", path: filePath });
  });
}