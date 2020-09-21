const express = require('express');
const router = express.Router();
const pool = require('../configuration/db');
const bcrypt = require('bcrypt');
const { generateAccessToken, generateRefreshToken } = require('../utils/jwtGenerator');
const authorization = require('../midelware/authorization');
const validation = require('../midelware/validation');
const jwt = require('jsonwebtoken');
require('dotenv').config();
//user calls

//get 
router.get('/me', authorization, async (req, res) => {
    try {
        const user = req.user;
        if (!user) {
            return res.status(403).json('Not Authorized!');
        }
        const me = await pool.query('SELECT name, email, user_id FROM  users WHERE user_id=$1', [user]);
        const current_date = await pool.query('SELECT current_date');
        if (me.rows.length === 1) {
            return res.json({
                ...me.rows[0],
                current_date: new Date(current_date.rows[0].current_date)
            });
        } else {
            res.status(403).json(' User doesnt exist!');
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// post 
router.post('/register/', validation, async (req, res) => {
    const client = await pool.connect();
    try {
        const { username, email, password } = req.body.data;
        console.log(req.body.data);
        // start transaction
        await client.query('BEGIN');
        const userCheck = await client.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userCheck.rows.length === 0) {
            // password hash
            const saltRound = 10;
            const salt = await bcrypt.genSalt(saltRound);
            const bcryptPassword = await bcrypt.hash(password, salt);
            //end of password hash
            const newUser = await client.query
                ('INSERT INTO users (name,email,password) VALUES ($1,$2,$3) RETURNING *',
                    [username, email, bcryptPassword]
                );
            //token handelingew
            const accessToken = generateAccessToken(newUser.rows[0].user_id);
            //refresh token insert to database
            const refreshToken = generateRefreshToken(newUser.rows[0].user_id);
            const newRefreshToken = await client.query
                ('INSERT INTO refreshTokens (user_id,token) VALUES ($1,$2) RETURNING *',
                    [newUser.rows[0].user_id, refreshToken]);
            const currentRefreshToken = newRefreshToken.rows[0].token;
            // handle cookies
            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 24 * 7 * 1000,
                path: '/token/refresh_token'
                //secure:true
            });
            await client.query('COMMIT');
            res.status(200).json({ accessToken });
        } else {
            await client.query('ROLLBACK');
            res.status(401).json('User Exists');
        }
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
});

router.post('/login/', validation, async (req, res) => {
    const client = await pool.connect();
    try {
        const { email, password } = req.body.data;
        // start transaction
        await client.query('BEGIN');
        const userCheck = await client.query('SELECT * FROM users WHERE email=$1', [email]);
        if (userCheck.rows.length === 1) {

            const validPassword = await bcrypt.compare(password, userCheck.rows[0].password);
            if (validPassword) {
                // token handeling
                const accessToken = generateAccessToken(userCheck.rows[0].user_id);
                const refreshToken = generateRefreshToken(userCheck.rows[0].user_id);
                // delete all previous refresh tokens
                const deleteTokens = await client.query('DELETE FROM refreshTokens WHERE user_id=$1', [userCheck.rows[0].user_id]);
                const newRefreshToken = await client.query('INSERT INTO refreshTokens (user_id,token) VALUES ($1,$2) RETURNING *', [
                    userCheck.rows[0].user_id, refreshToken
                ])
                // handle cookies
                res.cookie('refreshToken', refreshToken, {
                    httpOnly: true,
                    maxAge: 60 * 60 * 24 * 7 * 1000,
                    path: '/token/refresh_token'
                    // secure:true
                });
                await client.query('COMMIT');
                res.status(200).json({ accessToken });
            } else {
                await client.query('ROLLBACK');
                return res.status(401).send('Password doesnt match!');
            }
        } else {
            await client.query('ROLLBACK');
            res.status(401).json('Somthing went wrong!');
        }
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status(500).send('Server Error');
    } finally {
        client.release();
    }
})
//put

//delete
// needs rework:3
router.delete('/logout', authorization, async (req, res) => {
    try {
        await pool.query('DELETE FROM refreshTokens WHERE user_id=$1', [req.user]);
        res.cookie('refreshToken', '', {
            maxAge: 0,
            httpOnly: true,
            path: '/token/refresh_token'
            //secure:true
        });
        res.status(200).json('logout');
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;