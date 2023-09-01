const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET = 'JWT_SECRET' } = process.env;

const AuthError = require('../errors/auth-error');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw (new AuthError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production'
        ? JWT_SECRET
        : 'dev-secret',
    );
  } catch (err) {
    next(new AuthError('Токен не валиден или устарел'));
    return;
  }

  req.user = payload;
  next();
};
