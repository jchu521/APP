const conn = require("../../db");
const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

module.exports = async (req, res) => {
  const fileId = req.params.fileId;
  const gfs = Grid(conn.db, mongoose.mongo);

  return gfs.files.findOne(
    {
      _id: new mongoose.mongo.ObjectId(fileId)
    },
    (err, file) => {
      console.log(file);
      // Check if file
      if (!file || file.length === 0) {
        return res.status(404).json({
          err: "No file exists"
        });
      }

      // Check if image
      if (
        file.contentType === "image/jpeg" ||
        file.contentType === "image/png"
      ) {
        // Read output to browser
        const readstream = gfs.createReadStream(file.filename);
        // var buffer = new Buffer();

        // var arrBuffer = [];
        // readstream.on("data", chunk => {
        //   console.log(1);
        //   console.log(chunk);
        //   arrBuffer.push(chunk);
        // });

        // readstream.on("end", () => {
        //   console.log(2);
        //   //   arrBuffer.concat()[0].toString("base64");
        //   var buf = Buffer.concat(arrBuffer);
        //   console.log(buf);
        //   res.send(buf);
        // });
        //** Binary array */
        readstream.pipe(res);
      } else {
        res.status(404).json({
          err: "Not an image"
        });
      }
    }
  );
};

//   const file = await conn
//     .collection("fs.files")
//     .findOne({ _id: new mongoose.mongo.ObjectId(fileId) });

//   if (!file || file.length === 0) return res.status(404);

//   if (file.contentType === "image/jpeg" || file.contentType === "image/png") {
//     // Read output to browser
//     const readstream = conn
//       .collection("fs.files")
//       .createReadStream(file.filename);
//     return readstream.pipe(res);
//   } else {
//     return res.status(404).json({
//       err: "Not an image"
//     });
//   }
