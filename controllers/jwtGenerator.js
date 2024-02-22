require('dotenv').config();
const jwt = require('jsonwebtoken');

function jwtGenerator(username) {
  const payload = {
    username: username,
  };

  const token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '1hr',
  });

  return token;
}

module.exports = jwtGenerator;
