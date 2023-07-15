const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const NotAuthError = require('../errors/NotAuthError');
const NotFoundError = require('../errors/NotFoundError');
const MongoDuplicateKeyError = require('../errors/MongoDuplicateKeyError');
const BadRequestError = require('../errors/BadRequestError');

const getUsers = (req, res, next) => {
  userSchema.find({})
    .then((users) => res.send(users))
    .catch(next);
};

const getUserById = (req, res, next) => {
  let userId;

  if (req.params.userId) {
    userId = req.params.userId;
  } else {
    userId = req.user._id;
  }

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid data when get user'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new NotFoundError(`User Id: ${userId} is not found`));
      }

      return next(res);
    });
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      userSchema.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(201).send(user.deletePassword()))
        .catch((err) => {
          if (err.code === 11000) {
            return next(new MongoDuplicateKeyError('A user with such a email is already registered'));
          }

          if (err.name === 'ValidationError') {
            return next(new NotFoundError('Invalid data when post user'));
          }

          return next(err);
        });
    })
    .catch(next);
};

const updateUser = (req, res, next) => {
  const { name, about } = req.body;
  userSchema.findByIdAndUpdate(
    req.user._id,
    { name, about },
    { new: true, runValidators: true },
  )
    .orFail(() => new NotFoundError('User by specified _id not found'))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data when updating a user'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  userSchema.findByIdAndUpdate(
    req.user._id,
    { avatar: req.body.avatar },
    { new: true, runValidators: true },
  )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Incorrect data when updating avatar'));
      } else {
        next(err);
      }
    });
};

const login = (req, res, next) => {
  console.log('33');
  const { email, password } = req.body;
  userSchema.findOne({ email })
    .select('+password')
    .orFail(() => new NotAuthError('Not valid user'))
    .then((user) => {
      console.log('0');
      bcrypt.compare(String(password), user.password)
        .then((isUserValid) => {
          console.log('1');
          if (isUserValid) {
            console.log('2');
            const token = jwt.sign({ _id: user._id }, 'secret-key');
            console.log('token', token);
            res.cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              httpOnly: true,
              sameSite: 'none',
              secure: true,
            });
            res.send(user.deletePassword());
          } else {
            throw new NotAuthError('Not valid user');
          }
        })
        .catch(next);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  console.log('getUserInfo');
  userSchema.findOne({ _id: req.user })
    .then((user) => res.send(user))
    .catch(next);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateAvatar,
  login,
  getUserInfo,
};
