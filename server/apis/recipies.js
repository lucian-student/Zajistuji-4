const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
const { saveIngredients, saveUtensils } = require('../query_functions/recipieFunctions');
const stepCreate = require('../query_functions/stepCreate');
const { updateIngredients, updateUtensils } = require('../query_functions/recipieUpdateFunctions');
const stepUpdate = require('../query_functions/stepUpdate');

//vytvori recept
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
            imageReference,
            ingredients,
            utensils,
            steps
        } = req.body;
        let result = {};
        //create recipie
        const newRecipie =
            await client.query('INSERT INTO recipies (user_id,name,category,description,imageUrl,image_reference)' +
                ' VALUES ($1,$2,$3,$4,$5,$6) RETURNING *',
                [
                    req.user,
                    name,
                    category,
                    description,
                    imageUrl,
                    imageReference
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
// smaze recept
router.delete('/delete_recipie/:id', [authorization, recipeOwner], async (req, res) => {
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
// upravi recept
router.put('/update_recipie/:id', [authorization, recipeOwner], async (req, res) => {
    const client = await pool.connect();
    try {
        await client.query('BEGIN');
        const {
            recipie,
            ingredients,
            utensils,
            steps
        } = req.body;
        let result = {};
        if (recipie) {
            const {
                name,
                category,
                description,
                imageUrl,
                imageReference
            } = recipie;
            const updateRecipie =
                await client.query('UPDATE recipies SET name=$1, category=$2, description=$3, imageUrl=$4, image_reference=$5' +
                    ' WHERE recipie_id=$6 RETURNING *',
                    [
                        name,
                        category,
                        description,
                        imageUrl,
                        imageReference,
                        req.params.id
                    ]);
            result = {
                recipie: updateRecipie.rows[0]
            };
        }
        if (ingredients) {
            const newIngredients = await updateIngredients(client, parseInt(req.params.id), ingredients);
            result = {
                ...result,
                ingredients: newIngredients
            };
        }
        if (utensils) {
            const newUtensils = await updateUtensils(client, parseInt(req.params.id), utensils);
            result = {
                ...result,
                utensils: newUtensils
            };
        }
        if (steps) {
            const newSteps = await stepUpdate(client, parseInt(req.params.id), steps);
            result = {
                ...result,
                steps: newSteps
            };
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