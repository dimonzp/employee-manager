const express = require("express");
const router = express.Router();
const generateToken = require("../utils/generateToken");
const userService = require("../services/UserService");

// /auth/register
router.post("/register", async (req, res) => {
  try {
    const { email, password, login } = req.body;
    const candidate = await userService.getMe(email);
    if (candidate) {
      return res.status(406).json({ message: "This email was registered earlier" });
    }
    let user = await userService.createUser(email, password, login);
    user = user.toJSON();
    delete user.password;
    await generateToken(res, email);

    res.status(201).json({ message: "Success", user });
  } catch (e) {
    res.status(404).json({ message: "Registration error", error: e });
  }
});

// /auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userService.getMe(email);
    const message = await userService.login(email, password);
    if (message) return res.status(400).json({ message });

    await generateToken(res, email);
    res.status(200).json({ message: "Login Success", user });
  } catch (error) {
    res.status(404).json({ message: "Login error", error });
  }
});
// /auth/logout
router.post("/logout", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userService.getMe(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    await generateToken(res, email, true);
    res.json({ message: "You are not in system now" });
  } catch (e) {
    res.status(404).json({ message: "Internal error" });
  }
});

module.exports = router;
