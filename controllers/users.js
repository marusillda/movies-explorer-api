const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const {
  HTTP_STATUS_NOT_FOUND,
  HTTP_STATUS_CREATED,
  HTTP_STATUS_UNAUTHORIZED,
} = require('node:http2').constants;
const {
  USER_NOT_FOUND,
  USER_NOT_AUTHORIZED,
} = require('../errorMessages');
const userModel = require('../models/user');
const asyncHandler = require('../middlewares/asyncHandler');
const { JWT_SECRET } = require('../config');

const generateToken = (userId) => jwt.sign({ _id: userId }, JWT_SECRET, { expiresIn: '7d' });

const createUser = asyncHandler(async (req, res) => {
  const pwdHash = await bcrypt.hash(req.body.password, 10);
  const userData = { ...req.body, password: pwdHash };
  const createdUser = await userModel.create(userData);
  const token = generateToken(createdUser._id);

  return res.status(HTTP_STATUS_CREATED).send({ token });
});

const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await userModel.findOne({ email }).select('+password');
  if (!user) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, USER_NOT_AUTHORIZED));
  }
  const compareResult = await bcrypt.compare(password, user.password);
  if (!compareResult) {
    return next(createError(HTTP_STATUS_UNAUTHORIZED, USER_NOT_AUTHORIZED));
  }
  const token = generateToken(user._id);
  return res.send({ token });
});

const updateUserModule = async (userId, data) => {
  const user = await userModel.findByIdAndUpdate(
    userId,
    { $set: data },
    { new: true, runValidators: true },
  );
  return user;
};

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  const user = await updateUserModule(req.user._id, { name, email });
  res.send(user);
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await userModel
    .findById(req.user._id)
    .orFail(createError(HTTP_STATUS_NOT_FOUND, USER_NOT_FOUND));
  res.send(user);
});

module.exports = {
  createUser,
  loginUser,
  updateProfile,
  getProfile,
};
