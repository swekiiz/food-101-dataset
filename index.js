const tf = require("@tensorflow/tfjs-node");
const express = require("express");
const app = express();

const callback = () => {
  app.post("/", (req, res) => {
    //upload images
  });

  app.listen(3000, () => {
    console.log("Start server at port 3000.");
  });
};

tf.loadLayersModel("file://models/tfjs/model.json")
  .then((model) => {
    callback();
    const result = model.predict('some picture')
  })
  .catch((err) => {
    console.log(err);
  });
