const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found');
const UnauthorizedError = require('../errors/unauthorized');
const { secretkey } = require('../middlewares/auth');

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.status(201).send({
      status: '201',
      data: {
        email: user.email,
        name: user.name,
      },
    }))
    .catch(() => next(new UnauthorizedError('Эта почта уже используется')));
};

// const login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then((user) => {
//       const token = jwt.sign(
//         { _id: user._id },
//         secretkey,
//         { expiresIn: '7d' },
//       );

//       res
//         .cookie('jwt', token, {
//           maxAge: 7 * 24 * 3600,
//           httpOnly: true,
//         })
//         .end();
// })
// .catch((err) => {
//   next(new UnauthorizedError(err.message));
// });
// };
const login = (req, res, next) => {
  User.findUserByCredentials(req.body.email, req.body.password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        secretkey,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
      });

      res
        .status(200)
        .send({ status: '200', message: 'messages.authorization.isSuccessful' });
    })
    .catch((err) => {
      next(new UnauthorizedError(err.message));
    });
};

const logout = (req, res, next) => {
  res.clearCookie('jwt', {
    httpOnly: true,
  });

  res.status(200).send({ status: '200', message: 'Встал и ушел' });
  next();
};


const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      return res.send({ status: '200', data: user });
    })
    .catch(next);
};

module.exports = {
  createUser,
  login,
  getUser,
  logout,
};
