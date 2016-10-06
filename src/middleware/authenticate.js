import jwt from 'jsonwebtoken';

import config from '../config';

function authenticate(req, res, next) {
  if (!req.headers || !('authorization' in req.headers)) {
    res.status(401).send({ error: 'Missing authorization header' });
    return;
  }
  const authHeader = req.headers.authorization;
  const parts = authHeader.split(' ');
  if (parts.length < 2 || parts.length > 2 || parts.shift().toLowerCase() !== 'bearer') {
    res.status(401).send({ error: 'Invalid authorization header format' });
    return;
  }
  const token = parts[0];
  jwt.verify(token, config.secret, (error, decoded) => {
    if (error || !('email' in decoded)) {
      res.status(401).send({ error: 'Invalid authorization token' });
      return;
    }
    req.email = decoded.email; // eslint-disable-line no-param-reassign
    next();
  });
}

export default authenticate ;
