const pool = require('../configuration/db');

module.exports = async (req, res, next) => {
    try {
        const recipe_id = req.params.id;
        const checkRecipe =
            await pool.query('SELECT * FROM recipies WHERE recipie_id=$1',
                [
                    recipe_id,
                ]);
        if (checkRecipe.rows.length === 0) {
            return res.status(403).json('Not Authorized!');
        }
        if (checkRecipe.rows[0].user_id !== req.user && !checkRecipe.rows[0].shared) {
            return res.status(403).json('Not Authorized!');
        }
    } catch (err) {
        console.log(err.message);
        return res.status(403).json('Not Authorized!');
    }
    next();
};