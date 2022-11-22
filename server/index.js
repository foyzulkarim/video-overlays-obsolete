const express = require("express");
const multer = require("multer");
const fs = require("fs-extra");

const { convert } = require("./processor");
const inputFolder = "./uploads/videos";
const outputFolder = "./uploads/videos/converted";

const fileFilter = (req, file, cb) => {
  console.log("file", file);
  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  // cb(null, false);

  // To accept the file pass `true`, like so:
  cb(null, true);

  // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
};

const upload = multer({
  dest: "uploads/videos",
  fileFilter: fileFilter,
  limits: { fileSize: 50000000 },
});

const app = express();

app.post("/upload/video", upload.single("video"), function (req, res, next) {
  console.log(req.file);
  res.send(req.file);
  return;
});

app.get("/convert/:name", async (req, res) => {
  console.log(req.params.name);
  const fullPath = `${inputFolder}/${req.params.name}`;
  const outputPath = `${outputFolder}/${req.params.name}`;
  const result = await convert(fullPath, outputPath);
  res.send("success", result);
});

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`listening on port ${PORT} on ${new Date().getTime()}`);
  console.log("application setup completed");
});
