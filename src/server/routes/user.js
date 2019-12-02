const express = require("express");
const router = express.Router();
const userController = require("../controllers/user/user.controller");
const authenticate = require("../middlewares/authenticate");
const upload = require("../multerStorge");

// Register Account
// post: api/v1/user/register
router.post("/register", express.json(), userController.registerAccount);

//Sign in account
// post: api/v1/user/signIn
router.post("/signIn", express.json(), userController.signInAccount);

//Update user details
// Put: api/v1/user/updateUserDetails
router.post(
  "/updateUserDetails",
  express.json(),
  authenticate,
  userController.updateDetails
);

//Update user details
// Put: api/v1/user/uploadingPhoto
router.post(
  "/uploadingPhoto",
  upload.single("imageFile"),
  authenticate,
  userController.uploadingPhoto
);

//get user
// Put: api/v1/user/avatar/:fileId
router.get("/avatar/:fileId", authenticate, userController.getPhoto);

//get user
// Put: api/v1/user/verifyEmail/:userId/:hash
router.get("/verifyEmail/:userId/:hash", userController.verifyEmail);

module.exports = router;
