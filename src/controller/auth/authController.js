const expressAsyncHandler = require("express-async-handler");
const Auth = require("../../model/auth/authModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      {
        id: userCreate._id,
        username: userCreate.username,
        email: userCreate.email,
        image: userCreate.image,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRED,
      }
    );

    const options = {
      expires: new Date(
        Date.now() + process.env.JWT_COOKIE_EXPIRED * 24 * 60 * 60 * 1000
      ),
    };

    res.cookie("authToken", token, options).json({
      message: `Post with title  was created successfully`,
      token: token,
    });
  } catch (error) {
    res.json(error);
    // console.log(error);
  }
});

module.exports = { registerController };
