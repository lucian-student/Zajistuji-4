const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');

router.put('/update_step/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            duration,
            name,
            description,
        } = req.body;
        const updateStep =
            await pool.query('UPDATE recipie_steps SET' +
                ' duration=$1, name=$2, description=$3' +
                ' WHERE step_id=$4 RETURNING *',
                [
                    duration,
                    name,
                    description,
                    id
                ]);

        res.json(updateStep.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
})

module.exports = router;