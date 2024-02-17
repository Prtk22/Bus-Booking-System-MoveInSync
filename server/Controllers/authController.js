const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/usersModel");

const Register = (req, res) => {
  User.findOne({ email: req.body.email }).exec()
    .then((user) => {
      if (user) {
        return res.send({
          message: "User already exists",
          success: false,
          data: null,
        });
      }
      return bcrypt.hash(req.body.password, 6);
    })
    .then((hashedPassword) => {
      req.body.password = hashedPassword;
      const newUser = new User(req.body);
      return newUser.save();
    })
    .then(() => {
      res.send({
        message: "User created successfully",
        success: true,
        data: null,
      });
    })
    .catch((error) => {
      res.send({
        message: error.message,
        success: false,
        data: null,
      });
    })
};

const Login = async (req, res) => {
  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
      return res.send({
        message: "User does not exist",
        success: false,
        data: null,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      existingUser.password
    );
    if (!isPasswordCorrect) {
      return res.send({
        message: "Incorrect password",
        success: false,
        data: null,
      });
    }

    const token = jwt.sign(
      { userId: existingUser._id,  isAdmin:existingUser.isAdmin},
      process.env.jwt_secret,
      {
        expiresIn: "24h",
      }
    );
    const user = {
      name: existingUser.name,
      email: existingUser.email,
      isAdmin: existingUser.isAdmin,
      _id: existingUser._id,
    };
    res.send({
      message: "User logged in successfully",
      success: true,
      data: token,
      user: user,
    });
  } catch (error) {
    res.send({
      message: error.message,
      success: false,
      data: null,
    });
  }
};

module.exports = { Register, Login };
