const pool = require('../configuration/db');

/*
zjisti jestli uzivatel vlastni ingredienci
*/
module.exports = async (req, res, next) => {
    try {
        const id = req.user;
        const ingredients_id = req.params.id;

        const checkUser =
            await pool.query('SELECT * FROM ingredients WHERE ingredients_id=$1 AND user_id=$2',
                [
                    ingredients_id,
                    id
                ]);
        if (checkUser.rows.length === 0) {
            return res.status(403).json('Not Authorized!');
        }
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized!');
    }
    next();
};