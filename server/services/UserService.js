const User = require("../models/User");
const bcrypt = require("bcrypt");

const userService = {
  async getMe(email) {
    return await User.findOne({ email });
  },
  
  async createUser(email, password, login) {
    const hashedPassword = await bcrypt.hash(password, 12);
    return await User.create({
      email,
      password: hashedPassword,
      login
    });
  },
  
  async login(email, password) {
    const user = await this.getMe(email);

    if (!user) {
      return "User not found";
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return "Check your login or password";
    }
    return null;
  }
};

module.exports = userService;
