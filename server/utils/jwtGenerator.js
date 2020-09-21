const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports.generateAccessToken = function generateAccessToken(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.SECRET1, { expiresIn: '1m' });
}


module.exports.generateRefreshToken = function generateRefreshToken(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.SECRET2);
}

