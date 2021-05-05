const tf = require("@tensorflow/tfjs-node");
const express = require("express");
const multer = require("multer");

const app = express();

const classData = require('./class');

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};

const upload = multer({
  dest: "./upload",
});

tf.loadLayersModel("file://models/tfjs/model.json")
  .then((model) => {
    app.post("/ml", upload.single("file"), (req, res) => {
      const tempPath = req.file.path;
      const targetPath = path.join(__dirname, "./uploads/image.png");

      if (path.extname(req.file.originalname).toLowerCase() === ".png") {
        fs.rename(tempPath, targetPath, (err) => {
          if (err) return handleError(err, res);
          let image = req.file;
          let tensorImg = tf.browser.fromPixels(image).resizeNearestNeighbor([-1,128,128,3]).toFloat().expandDims();
          let prediction = amodel.predict(tensorImg).data();
          res.status(200).contentType("text/plain").end(classData[prediction[0]]);
        });
      } else {
        fs.unlink(tempPath, (err) => {
          if (err) return handleError(err, res);
          res
            .status(403)
            .contentType("text/plain")
            .end("Only .png files are allowed!");
        });
      }
    });

    app.listen(3000, () => {
      console.log("Start server at port 3000.");
    });
  })
  .catch((err) => {
    console.log(err);
  });
