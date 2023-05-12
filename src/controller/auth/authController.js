const expressAsyncHandler = require("express-async-handler");
const formidable = require("formidable");
const validator = require("validator");
const Auth = require("../../model/auth/authModel");
const bcrypt = require("bcrypt");

//----------------------------------------------
// Register
//----------------------------------------------
const registerController = expressAsyncHandler(async (req, res) => {
  console.log(req.file.filename);
  const checkUser = await Auth.findOne({
    email: req.body.email,
  });
  if (checkUser) {
    throw new Error(
      "Creating failed because it content profane words and you havae been blocked"
    );
  }

  if (!req.file) {
    throw new Error("No file uploaded.");
  }
  let localPath = `public/images/users/${req.file.filename}`;
  //   console.log(localPath);
  try {
    const userCreate = await Auth.create({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      image: localPath,
    });

    res.json({
      message: `Post with title  was created successfully`,
      userCreate: userCreate,
    });
  } catch (error) {
    res.json(error);
    // console.log(error);
  }
});

module.exports = { registerController };
