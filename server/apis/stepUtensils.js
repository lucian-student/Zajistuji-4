const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
/*
zmeni krok
*/
router.put('/change_step/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            step_id
        } = req.body;
        const updatedUtensil =
            await pool.query('UPDATE step_utensils SET' +
                ' step_id=$1 WHERE utensils_id=$2 RETURNING *',
                [
                    step_id,
                    id
                ]);
        res.json(updatedUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

/*
vytvorit nastroj
*/
router.post('/create_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            step_id,
            name
        } = req.body;
        const newUtensil =
            await pool.query('INSERT INTO step_utensils (step_id,name)' +
                ' VALUES ($1,$2) RETURNING *',
                [
                    step_id,
                    name
                ]);
        res.json(newUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
smaze nastroj
*/
router.delete('/delete_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id
        } = req.body;
        const deleteUtensils =
            await pool.query('DELETE FROM step_utensils WHERE utensils_id=$1 RETURNING utensils_id',
                [
                    id
                ]);
        res.json(deleteUtensils.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
upravi nastroj
*/
router.put('/update_utensil/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            name
        } = req.body;
        const updatedUtensil =
            await pool.query('UPDATE step_utensils SET' +
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