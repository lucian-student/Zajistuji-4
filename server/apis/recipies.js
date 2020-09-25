const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const { saveIngredients, saveUtensils } = require('../query_functions/recipieFunctions');
const stepCreate = require('../query_functions/stepCreate');

router.post('/create_recipie', authorization, async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        //
        const {
            name,
            category,
            description,
            imageUrl,
            ingredients,
            utensils,
            steps
        } = req.body;
        let result = {};
        //create recipie
        const newRecipie =
            await client.query('INSERT INTO recipies (user_id,name,category,description,imageUrl)' +
                ' VALUES ($1,$2,$3,$4,$5) RETURNING *',
                [
                    1,
                    name,
                    category,
                    description,
                    imageUrl
                ]);
        result = {
            recipie: newRecipie.rows[0]
        };
        //ingredients
        if (ingredients) {
            const newIngredients = await saveIngredients(client, parseInt(newRecipie.rows[0].recipie_id), ingredients);
            result = {
                ...result,
                ingredients: newIngredients
            };
        }
        //utensils
        if (utensils) {
            const newUtensils = await saveUtensils(client, parseInt(newRecipie.rows[0].recipie_id), utensils);
            result = {
                ...result,
                utensils: newUtensils
            }
        }
        //steps
        if (steps) {
            const newSteps = await stepCreate(client, parseInt(newRecipie.rows[0].recipie_id), steps);
            result = {
                ...result,
                steps: newSteps.steps,
                step_ingredients: newSteps.ingredients,
                step_utensils: newSteps.utensils
            }
        }
        await client.query('COMMIT');
        res.json(result);
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status('500').json('server error');
    } finally {
        client.release();
    }
});

router.delete('/delete_recipie/:id', authorization, async (req, res) => {
    try {
        const deleteRecipie =
            await pool.query('DELETE FROM recipies WHERE recipie_id=$1 RETURNING recipie_id',
                [
                    req.params.id
                ]);
        res.json(deleteRecipie.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.put('/update_recipie/:id', async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            name,
            category,
            description,
            imageUrl,
            ingredients,
            utensils,
            steps
        } = req.body;

        await client.query('COMMIT');
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status('500').json('server error');
    } finally {
        client.release();
    }
});

module.exports = router;