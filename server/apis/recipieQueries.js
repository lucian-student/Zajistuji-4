const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');


router.get('/get_recipies', authorization, async (req, res) => {
    try {
        const page = req.query.page * 10;
        const userId = req.user;

        const recipies =
            await pool.query('SELECT * from recipies WHERE user_id=$1 ORDER BY date_of_creation desc' +
                ' OFFSET $2 LIMIT 10',
                [
                    userId,
                    page
                ]);
        res.json(recipies.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.get('/get_recipe/:id', [recipeOwner, authorization], async (req, res) => {
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
        res.status('500').json('server error');
    }
});

router.get('/get_steps', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const page = req.query.page * 10;

        const steps =
            await pool.query('SELECT * FROM recipie_steps WHERE recipie_id=$1' +
                ' OFFSET $2 LIMIT 10',
                [
                    recipieId,
                    page
                ]);
        res.json(steps.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.get('/get_step_ingredients_utensils', authorization, async (req, res) => {
    try {
        const stepId = req.query.id;

        const ingredients =
            await pool.query('SELECT * FROM step_ingredients WHERE step_id=$1',
                [
                    stepId
                ]);
        const utensils =
            await pool.query('SELECT * FROM step_utensils WHERE step_id=$1',
                [
                    stepId
                ]);
        res.json({ ingredients, utensils });
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.get('/get_recipie_ingredients', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const page = req.query.page * 10;

        const ingredients =
            await pool.query('SELECT * FROM recipie_ingredients WHERE recipe_id=$1' +
                'OFFSET $2 LIMIT 10', [
                recipieId,
                page
            ]);
        res.json(ingredients.rows);
    } catch (er) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.get('/get_recipie_utensils', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const page = req.query.page * 10;

        const utensils =
            await pool.query('SELECT * FROM recipie_utensils WHERE recipe_id=$1' +
                'OFFSET $2 LIMIT 10', [
                recipieId,
                page
            ]);
        res.json(utensils.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
module.exports = router;

