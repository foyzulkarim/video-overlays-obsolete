const express = require("express");
const multer = require("multer");

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
  res.send("Success");
  return;
});

const PORT = 4000;
app.listen(PORT, async () => {
  console.log(`listening on port ${PORT}`);
  console.log("application setup completed");
});
