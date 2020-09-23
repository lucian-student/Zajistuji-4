const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const saveIngredients = require('../query_functions/saveIngredients');

router.post('/create_recipie', async (req, res) => {
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
                ' VALUES ($1,$2,$3,$4,$5) RETURINING *',
                [
                    1,
                    name,
                    category,
                    description,
                    imageUrl
                ]);
        //ingredients
        if (ingredients) {
            const newIngredients = await saveIngredients(client, newRecipie.rows[0].recipie_id, ingredients);
        }
        //utensils

        //steps
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