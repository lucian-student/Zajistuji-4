const router = require('express').Router();
const jwt = require('jsonwebtoken');
const pool = require('../configuration/db');
const { generateAccessToken } = require('../utils/jwtGenerator');
require('dotenv').config();
//get

//post
// neeeds rework
// Auth will create refresh token in db and in http only cookie after login or if the cookie is not expired 
// accces token can be stored  in local storage because it will be like 1m long so it doesnt rlly matter
// so everytime acces token expires you will get new one if refresh token is in cookie
// And refresh token must be in db too, when is new refresh token called all other user refresh tokens are deleted
// So thats the play for the auth!
router.post('/refresh_token', async (req, res) => {
    // migrate this to users!
    try {
        const refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) {
            console.log('refresh token doesnt exist');
            return res.status(403).json('Not Authorized!');

        }
        const { user } = jwt.verify(refreshToken, process.env.SECRET2);
        const checkToken = await pool.query('SELECT * FROM refreshTokens WHERE token=$1', [refreshToken]);


        if (checkToken.rows.length === 0) {
            console.log('not found in db');
            return res.status(403).json('Not Authorized!');
        }

        const accessToken = generateAccessToken(user);
        res.json({ accessToken });

    } catch (err) {
        console.log('some error');
        console.log(err.message);
        res.status(403).json('Not Authorized!');
    }
});

//put

//delete



module.exports = router;