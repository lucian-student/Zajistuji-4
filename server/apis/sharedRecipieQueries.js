const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const sharedRecipe = require('../midelware/sharedRecipe');

router.get('/get_recipe/:id', [authorization, sharedRecipe], async (req, res) => {
    try {
        const recipe_id = req.params.id;
        const recipe =
            await pool.query('SELECT * from recipies WHERE recipie_id=$1',
                [
                    recipe_id
                ]);
        res.json(recipe.rows[0])
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
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
                'SELECT recipies.* FROM likes INNER JOIN recipies ON likes.recipie_id=recipies.recipie_id' +
                ' OFFSET $2 LIMIT 10',
                [
                    req.user,
                    page
                ]);
        res.json(recipies.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.get('/popular_recipes', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipes =
            await pool.query('SELECT * FROM  recipies ORDER BY num_of_likes desc OFFSET $1 LIMIT 10',
                [
                    page
                ]);
        res.json(recipes.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;