const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const utensilOwner = require('../midelware/utensilOwner');
/*
vrati nastroje
*/
router.get('/get_utensils', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const utensils =
            await pool.query('SELECT * FROM utensils WHERE user_id=$1 ORDER BY date_of_creation desc' +
                ' OFFSET $2 LIMIT 10',
                [
                    req.user,
                    page
                ]);
        res.json(utensils.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
vytvori nastroje
*/

router.post('/create_utensil', authorization, async (req, res) => {
    try {
        const { name } = req.body;
        const newUtensil =
            await pool.query('INSERT INTO utensils (user_id,name)' +
                ' VALUES ($1,$2) RETURNIng *',
                [
                    req.user,
                    name
                ]);
        res.json(newUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
upravi nastroje
*/
router.put('/update_utensil/:id', [authorization, utensilOwner], async (req, res) => {
    try {
        const { name } = req.body;
        const updatedUtensil =
            await pool.query('UPDATE utensils SET name=$1 WHERE utensils_id=$2 RETURNING *',
                [
                    name,
                    req.params.id
                ]);
        res.json(updatedUtensil.rows[0])
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
/*
smaze nastrtoje
*/
router.delete('/delete_utensil/:id', [authorization, utensilOwner], async (req, res) => {
    try {
        const deleteUtensil =
            await pool.query('DELETE FROM utensils WHERE utensils_id=$1 RETURNING utensils_id',
                [
                    req.params.id
                ]);
        res.json(deleteUtensil.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

module.exports = router;













