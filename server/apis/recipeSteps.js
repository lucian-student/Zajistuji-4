const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
const newStepIngredientsUtensilsCreate = require('../query_functions/newStepIngredientsUtensilsCreate');

router.put('/move_step/:id', [authorization, recipeOwner], async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            id,
            start_index,
            finish_index
        } = req.body;
        if (start_index < finish_index) {
            await client.query('UPDATE recipie_steps' +
                ' set order_index=order_index-1' +
                ' WHERE order_index>=$1 and order_index<=$2 and recipie_id=$3 ',
                [
                    start_index,
                    finish_index,
                    req.params.id
                ]);
        } else {
            await client.query('UPDATE recipie_steps' +
                ' set order_index=order_index+1' +
                ' WHERE order_index>=$1 and order_index<=$2 and recipie_id=$3 ',
                [
                    finish_index,
                    start_index,
                    req.params.id
                ]);
        }

        await client.query('UPDATE recipie_steps' +
            ' set order_index=$1' +
            ' WHERE step_id=$2',
            [
                finish_index,
                id
            ]);
        await client.query('COMMIT');
        res.json('success');
    } catch (err) {
        await client.query('ROLLBACK');
        console.log(err.message);
        res.status('500').json('server error');
    } finally {
        client.release();
    }
});
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
            ingredients,
            utensils
        } = req.body;
        let result = {};
        const newStep =
            await client.query(
                'WITH count AS (SELECT count(*) as total_count FROM recipie_steps WHERE recipie_id=$1)' +
                ' INSERT INTO recipie_steps (recipie_id,duration,name,description,order_index)' +
                ' VALUES ($1,$2,$3,$4,(SELECT total_count FROM count)) RETURNING *',
                [
                    recipie_id,
                    duration,
                    name,
                    description
                ]);
        result = { ...newStep.rows[0] };
        const ingredientsAndUtensils = await newStepIngredientsUtensilsCreate(client, ingredients, utensils, newStep.rows[0].step_id);
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