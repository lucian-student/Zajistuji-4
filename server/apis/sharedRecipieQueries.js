const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');

router.get('/shared_recipies', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipies =
            await pool.query('SELECT * FROM recipies WHERE shared=true ORDER BY date_of_creation' +
                ' OFFSET $1 LIMIT 10'
                , [
                    page
                ]);
        res.json(recipies.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/liked_recipies', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipies =
            await pool.query('WITH likes AS (SELECT * FROM recipie_like WHERE user_id=$1)' +
                'SELECT * FROM likes INNER JOIN recipies ON likes.recipie_id=recipies.recipie_id' +
                ' OFFSET $2 LIMIT 10',
                [
                    1,
                    page
                ]);
        res.json(recipies.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
})

module.exports = router;