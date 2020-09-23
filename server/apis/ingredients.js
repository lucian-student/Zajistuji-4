const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

router.post('/create_ingredients', authorization, async (req, res) => {
    try {
        const { category, name } = req.body;
        const newIngredients =
            await pool.query('INSERT INTO ingredients (user_id,category,name)' +
                ' VALUES ($1,$2,$3) RETURNING *',
                [
                    req.user,
                    category,
                    name
                ]);
        res.json(newIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.put('/update_ingredients/:id', authorization, async (req, res) => {
    try {
        const { category, name } = req.body;
        const updatedIngredients =
            await pool.query('UPDATE ingredients SET name=$1, category=$2' +
                ' WHERE ingredients_id=$3 RETURNING *',
                [
                    name,
                    category,
                    req.params.id
                ])
        res.json(updatedIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.delete('/delete_ingredients/:id', authorization, async (req, res) => {
    try {
        const deleteIngredients =
            await pool.query('DELETE FROM ingredients WHERE ingredients_id=$1 RETURNING ingredients_id',
                [
                    req.params.id
                ]);
        res.json(deleteIngredients.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});


module.exports = router;