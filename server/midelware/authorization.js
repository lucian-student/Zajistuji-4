const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = async (req, res, next) => {
    let authorization = req.headers['authorization'];

    if (!authorization) {
            return res.status(403).json('Not Authorized!');
        // on post request for some reson u need to get headers from req.body.headers.Authorization;
    }

    try {
        const accessToken = authorization.split(' ')[1];
        const { user } = jwt.verify(accessToken, process.env.SECRET1);

        req.user = user;
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized!');
    }


    next();
};