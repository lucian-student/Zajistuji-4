const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
// upravit nastroj
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
// vytvorit nastroj
router.post('/create_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            name
        } = req.body;
        const newUtensil =
            await pool.query('INSERT INTO recipie_utensils (recipie_id,name)' +
                ' VALUES ($1,$2) RETURNING *',
                [
                    req.params.id,
                    name
                ]);
        res.json(newUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
// smazat nastroj receptu
router.delete('/delete_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id
        } = req.body;

        const deleteIngredients =
            await pool.query('DELETE FROM recipie_utensils' +
                ' WHERE utensils_id=$1 RETURNING utensils_id',
                [
                    id
                ]);
        res.json(deleteIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

module.exports = router;