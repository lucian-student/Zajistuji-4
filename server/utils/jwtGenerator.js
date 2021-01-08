const jwt = require('jsonwebtoken');
const serviceAccount = require('./recepty-2c93a-firebase-adminsdk-zfzv3-7bc67716c1.json')
require('dotenv').config();
/*
vytvori access jsonwebtoken
*/
module.exports.generateAccessToken = function generateAccessToken(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.SECRET1, { expiresIn: '1m' });
}

/*
vytvori firebase jsonwebtoken
*/
module.exports.generateFirebaseToken = function generateFirebaseToken(user_id) {
    const payload = {
        uid: String(user_id),
        iss: serviceAccount.client_email,
        sub: serviceAccount.client_email,
        aud: "https://identitytoolkit.googleapis.com/google.identity.identitytoolkit.v1.IdentityToolkit",
    };
    return jwt.sign(payload, serviceAccount.private_key, { algorithm: 'RS256', expiresIn: '10m' });
}
/*
vytvori refresh jsonwebtoken
*/
module.exports.generateRefreshToken = function generateRefreshToken(user_id) {
    const payload = {
        user: user_id
    };

    return jwt.sign(payload, process.env.SECRET2);
}

