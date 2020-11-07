const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');

router.put('/update_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            name,
            id
        } = req.body;

        const updatedUtensil =
            await pool.query('UPDATE recipie_utensils SET' +
                ' name=$1' +
                ' WHERE utensils_id=$2 RETURNING *',
                [
                    name,
                    id
                ]);
        res.json(updatedUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
module.exports = router;