const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const sharedRecipe = require('../midelware/sharedRecipe');
// vrati sdileny recept
router.get('/get_recipe/:id', [authorization, sharedRecipe], async (req, res) => {
    try {
        const recipe_id = req.params.id;
        const recipe =
            await pool.query(
                'WITH recipe AS (SELECT * FROM recipies WHERE recipie_id=$1)' +
                ' SELECT recipe.*, u1.name as username from recipe' +
                ' inner join users u1 on u1.user_id=recipe.user_id',
                [
                    recipe_id
                ]);
        res.json(recipe.rows[0])
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// vrati sdilenee recpety
router.get('/shared_recipies', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipies =
            await pool.query(
                'WITH recipes AS (SELECT * FROM recipies WHERE shared=true ORDER BY date_of_creation desc OFFSET $1 LIMIT 10)' +
                ' SELECT recipes.*, u1.name as username FROM recipes' +
                ' inner join users u1 on u1.user_id=recipes.user_id' +
                ' ORDER BY recipes.date_of_creation desc'
                , [
                    page
                ]);
        res.json(recipies.rows);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
// vrati oblibene recepty
router.get('/liked_recipies', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipies =
            await pool.query('WITH likes AS (SELECT * FROM recipie_like WHERE user_id=$1),' +
                ' recipes AS (SELECT * FROM recipies WHERE shared=true)' +
                ' SELECT recipes.*, u1.name as username FROM likes' +
                ' INNER JOIN recipes ON likes.recipie_id=recipes.recipie_id' +
                ' INNER JOIN users u1 on u1.user_id=recipes.user_id' +
                ' ORDER BY recipes.date_of_creation desc' +
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
// vrati popularni recepty
router.get('/popular_recipes', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const recipes =
            await pool.query(
                'WITH recipes AS (SELECT * FROM  recipies WHERE shared=true ORDER BY num_of_likes desc OFFSET $1 LIMIT 10)' +
                ' SELECT recipes.*, u1.name as username FROM recipes' +
                ' inner join users u1 on u1.user_id=recipes.user_id' +
                ' ORDER BY recipes.num_of_likes desc, recipes.date_of_creation desc',
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