const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');

//vrati izivatelovy recepty
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
// vrati 1 konkretni recept
router.get('/get_recipe/:id', [authorization, recipeOwner], async (req, res) => {
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
// vrati kroky receptu
router.get('/get_steps', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const steps =
            await pool.query('SELECT * FROM recipie_steps WHERE recipie_id=$1 ORDER BY order_index asc',
                [
                    recipieId
                ]);
        const stepIds = [...steps.rows.map(step => step.step_id)];

        const ingredients =
            await pool.query('SELECT * FROM step_ingredients' +
                ' WHERE step_id = ANY($1::bigint[])',
                [
                    stepIds
                ]);
        const utensils =
            await pool.query('SELECT * FROM step_utensils' +
                ' WHERE step_Id = ANY($1::bigint[])',
                [
                    stepIds
                ]);
        let resultSteps = [];

        steps.rows.forEach(step => {
            let currStep = {
                ...step,
                ingredients: [],
                utensils: []
            };
            ingredients.rows.forEach(ingredient => {
                if (ingredient.step_id === step.step_id) {
                    currStep.ingredients.push(ingredient);
                }
            });
            utensils.rows.forEach(utensil => {
                if (utensil.step_id === step.step_id) {
                    currStep.utensils.push(utensil);
                }
            });
            resultSteps.push(currStep);
        });
        res.json(resultSteps);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

// vrati ingredience receptu
router.get('/get_recipie_ingredients', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const ingredients =
            await pool.query('SELECT * FROM recipie_ingredients WHERE recipie_id=$1',
                [
                    recipieId
                ]);
        res.json(ingredients.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
// vrati  nastroje receptu
router.get('/get_recipie_utensils', authorization, async (req, res) => {
    try {
        const recipieId = req.query.id;
        const utensils =
            await pool.query('SELECT * FROM recipie_utensils WHERE recipie_id=$1',
                [
                    recipieId
                ]);
        res.json(utensils.rows);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});
module.exports = router;

