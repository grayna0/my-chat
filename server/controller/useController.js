const User = require("../model/userModel");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  try {
    const { password, email, username } = req.body;
    const usernameCheck = await User.findOne({ username });

    if (usernameCheck)
      return res.json({ msg: "User already used", status: false });

    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;

    return res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { password, username } = req.body;
    const userCheck = await User.findOne({ username });

    if (!userCheck)
      return res.json({ msg: "Inconrect username or password", status: false });

    const isPasswordValid = await bcrypt.compare(password, userCheck.password);
    if (!isPasswordValid) {
      return res.json({ msg: "Inconrect username or password", status: false });
    }
    delete userCheck.password;

    return res.json({ status: true, userCheck });
  } catch (ex) {
    next(ex);
  }
};
