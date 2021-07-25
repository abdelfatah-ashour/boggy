const router = require("express").Router();
const { Register, login, logout } = require("../controllers/authControllers");

const multer = require("multer");

// config multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profile");
  },
  filename: function (req, file, cb) {
    2;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    "-" + today.getTime();
    cb(
      null,
      date +
        "-" +
        file.originalname +
        "." +
        require("mime").extension(file.mimetype)
    );
  },
});
const upload = multer({ storage: storage });

router.route("/register").post(upload.single("imageProfile"), Register);
router.route("/login").post(login);
router.route("/logout").get(logout);

module.exports = router;
