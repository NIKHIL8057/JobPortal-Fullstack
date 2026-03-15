import multer from "multer"

const storage = multer.memoryStorage();

export const singleUploader = multer({storage}).single("resume")