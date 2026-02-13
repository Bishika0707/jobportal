import multer from "multer";

const storage = multer.memoryStorage(); // store files in memory before sending to Cloudinary

export const singleUpload = multer({ storage }).single("file");
