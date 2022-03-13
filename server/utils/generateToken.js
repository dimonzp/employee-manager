const jwt = require("jsonwebtoken");

const generateToken = (res, email, logout) => {
  let expiration = logout ? 10 : 1209600000;

  const token = jwt.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: "14d",
  });
  return res.cookie("token", token, {
    expires: new Date(Date.now() + expiration),
    secure: false, // set to true if your using https
    httpOnly: true,
  });
};
module.exports = generateToken;
