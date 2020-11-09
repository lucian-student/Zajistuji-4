const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
const newStepIngredientsUtensilsCreate = require('../query_functions/newStepIngredientsUtensilsCreate');

router.put('/update_step/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id,
            duration,
            name,
            description
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
});

router.delete('/delete_step/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const {
            id
        } = req.body;
        const deleteStep =
            await pool.query('DELETE FROM recipie_steps WHERE step_id=$1 RETURNING step_id',
                [
                    id
                ]);
        res.json(deleteStep.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

router.post('/create_step/:id', [authorization, recipeOwner], async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const recipie_id = req.params.id;
        const {
            duration,
            name,
            description,
            order_index,
            ingredients,
            utensils
        } = req.body;
        let result = {};
        const newStep =
            await client.query('INSERT INTO recipie_steps (recipie_id,duration,name,description,order_index)' +
                ' VALUES ($1,$2,$2,$4,$5) RETURNING *',
                [
                    recipie_id,
                    duration,
                    name,
                    description,
                    order_index
                ]);
        result = { step: newStep.rows[0] };
        const ingredientsAndUtensils = await newStepIngredientsUtensilsCreate(client, ingredients, utensils);
        if (ingredientsAndUtensils.ingredients) {
            result = {
                ...result,
                ingredients: ingredientsAndUtensils.ingredients
            }
        } else {
            result = {
                ...result,
                ingredients: []
            }
        }
        if (ingredientsAndUtensils.utensils) {
            result = {
                ...result,
                utensils: ingredientsAndUtensils.utensils
            }
        } else {
            result = {
                ...result,
                utensils: []
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

module.exports = router;