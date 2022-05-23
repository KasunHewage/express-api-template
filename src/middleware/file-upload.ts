import multer from "multer";
import sharp from "sharp";

const storage = multer.memoryStorage();

const multerFilter = (req: any, file: any, cb: any) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Not an image!", false);
  }
};

const maxSize = 3 * 1024 * 1024;

const upload = multer({
  storage,
  fileFilter: multerFilter,
  limits: { fileSize: maxSize },
});

export const imageUpload = upload.single("photo");

export const imageProcess = (req: any, res: any, next: any) => {
  if (!req.file) return next();

  sharp(req.file.buffer)
    .resize(500, 500, {
      fit: sharp.fit.contain,
      withoutEnlargement: false,
    })
    .toFormat("jpeg")
    .jpeg({ quality: 85 })
    .toBuffer();
  // .toFile(`src/public/${Date.now()}.jpeg`);

  next();
};
