var express = require("express");
var cors = require("cors");
require("dotenv").config();
var multer = require("multer");

var app = express();
var fileStorageEngine = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log("destination :", file);
    cb(null, process.cwd() + "/upload");
  },
  filename: function (req, file, cb) {
    console.log("filename :", file);
    cb(null, file.originalname);
  },
});
var upload = multer({ storage: fileStorageEngine });

app.use(cors());
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    var filedata = req.file;
    if(req.file)
    res.json({
      name: filedata.originalname,
      type: filedata.mimetype,
      size: filedata.size,
    });
  } catch (err) {
    res.end(400);
  }
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
