const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
/*
smeni krok
*/
router.put('/change_step/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            step_id
        } = req.body;
        const updateIngredients =
            await pool.query('UPDATE step_ingredients SET' +
                ' step_id=$1 WHERE ingredients_id=$2 RETURNING *',
                [
                    step_id,
                    id
                ]);
        res.json(updateIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
vytvori ingredienci
*/
router.post('/create_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            step_id,
            unit,
            value,
            category,
            name
        } = req.body;
        const newIngredients =
            await pool.query('INSERT INTO step_ingredients (step_id,unit,value,category,name)' +
                ' VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [
                    step_id,
                    unit,
                    value,
                    category,
                    name
                ]);
        res.json(newIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
smaze ingredienci
*/
router.delete('/delete_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id
        } = req.body;
        const deleteIngredients =
            await pool.query('DELETE FROM step_ingredients WHERE ingredients_id=$1 RETURNING ingredients_id',
                [
                    id
                ]);
        res.json(deleteIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
upravi ingredienci
*/
router.put('/update_ingredients/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            unit,
            value,
            name,
            category
        } = req.body;
        const updateIngredients =
            await pool.query('UPDATE step_ingredients SET' +
                ' unit=$1, value=$2, name=$3, category=$4' +
                ' WHERE ingredients_id=$5 RETURNING *',
                [
                    unit,
                    value,
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

module.exports = router;