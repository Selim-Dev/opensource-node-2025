const User = require("../models/User");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");


const login = async (req, res, next) => {
  const { email, password } = req.body;
  //1) get user by email from database (if not exist throw error)
  const user = await User.findOne({ email }).select("+password");
  if (!user) return next(new AppError("invalid credentials", 400));
  //2) compare the password provided with the password hash saved in database (if not match : throw error )

  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword) return next(new AppError("invalid credentials", 400));
  //3) generate jwt token with the email and return to user
  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
  res.send({
    status: "success",
    token,
  });
};

const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return next(new AppError("invalid credentials", 400));

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("🚀 ~ signup ~ hashedPassword:", hashedPassword);

  const user = await User.create({ username, email, password: hashedPassword });
  res.status(201).send(user);
};

module.exports = { login, signup };
