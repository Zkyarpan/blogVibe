import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

export const uploadFile = async (req, res) => {
  try {
    upload.single("file")(req, res, (err) => {
      if (err) {
        return res
          .status(400)
          .json({ message: "File upload failed", error: err });
      }
      const file = req.file;
      res.status(200).json(file.filename);
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
