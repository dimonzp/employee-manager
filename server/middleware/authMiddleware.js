const userService = require("../services/UserService");
const jwt = require("jsonwebtoken");


const checkToken = async (req) => {
  const token = req.cookies.token;
  if (!token) return

  const { email } = await jwt.verify(token, process.env.JWT_SECRET);
  return email;
};

module.exports = async (req, res, next) => {
  try {
    const email = await checkToken(req);
    if(!email) return res.status(401).json({ message: "You are not authorized" });
    let user = await userService.getMe(email);
    user = user.toJSON();
    delete user.password;
    req.user = user
    next();
  } catch (error) {
    return res.status(400).json({ message: "Middleware error", error});
  }
};
