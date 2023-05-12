const expressAsyncHandler = require("express-async-handler");

//----------------------------------------------
// Register
//----------------------------------------------
const getRegister = expressAsyncHandler(async (req, res) => {
  try {
    res.json({
      message: "Register Successfully",
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = { getRegister };
