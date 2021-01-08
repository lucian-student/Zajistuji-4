const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
// upravi ingredienci
router.put('/update_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            category,
            name,
            id
        } = req.body;
        const updateIngredients =
            await pool.query('UPDATE recipie_ingredients SET' +
                ' name=$1, category=$2' +
                ' WHERE ingredients_id=$3 RETURNING *',
                [
                    name,
                    category,
                    id
                ]);
        res.json(updateIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

// vytvori ingredienci
router.post('/create_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            name,
            category
        } = req.body;
        const newIngredients =
            await pool.query('INSERT INTO recipie_ingredients (recipie_id,category,name)' +
                ' VALUES ($1,$2,$3) RETURNING *',
                [
                    req.params.id,
                    category,
                    name
                ]);
        res.json(newIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
// smaze ingredienci
router.delete('/delete_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id
        } = req.body;

        const deleteIngredients =
            await pool.query('DELETE FROM recipie_ingredients' +
                ' WHERE ingredients_id=$1 RETURNING ingredients_id',
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