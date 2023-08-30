const allowedCors = [
  'https://kseter.mesto.nomoredomainsicu.ru/',
  'http://kseter.mesto.nomoredomainsicu.ru/',
  'https://api.kseter.mesto.nomoredomainsicu.ru/',
  'http://api.kseter.mesto.nomoredomainsicu.ru/',
  'http://localhost:3000/',
];

module.exports = (req, res, next) => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    return res.end();
  }

  next();
};
