const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const crypto = require("crypto");

var dbURI = `mongodb://${process.env.REACT_APP_DB_USER}:${process.env.REACT_APP_DB_PASSWORD}@ds155714.mlab.com:55714/${process.env.REACT_APP_DB_NAME}`;

// Create storage engine
const storage = new GridFsStorage({
  url: dbURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          console.log(err);
          return reject(err);
        }
        const filename = `${buf.toString("hex")}-${file.originalname}`;
        const fileInfo = {
          filename: filename,
          bucketName: "fs"
        };
        resolve(fileInfo);
      });
    });
  }
});

const fileFilter = (req, file, cb) => {
  //reject
  if (file.mimetype.includes("image")) {
    cb(null, true);
  } else {
    cb(new Error("Message Wrong type"), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fieldSize: 1024 * 1024 * 5
  }
});

module.exports = upload;
