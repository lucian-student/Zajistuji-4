const router = require('express').Router();
const pool = require('../configuration/db');
const authorization = require('../midelware/authorization');
const recipeOwner = require('../midelware/recipeOwner');
/*
upravi recept
*/
router.put('/update_recipe_data/:id', [authorization, recipeOwner], async (req, res) => {
    try {
        const id = req.params.id;
        const {
            name,
            category,
            description,
            imageUrl,
            image_reference
        } = req.body;

        const updatedRecipe =
            await pool.query('UPDATE recipies SET' +
                ' name=$1, category=$2, description=$3' +
                ', imageurl=$4, image_reference=$5' +
                ' WHERE recipie_id=$6 RETURNING *',
                [
                    name,
                    category,
                    description,
                    imageUrl,
                    image_reference,
                    id
                ]
            );
        res.json(updatedRecipe.rows[0]);
    } catch (err) {
        console.log(err.message);
        res.status('500').json('server error');
    }
});

module.exports = router;