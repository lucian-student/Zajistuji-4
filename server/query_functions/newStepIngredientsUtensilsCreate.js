module.exports = async (client, ingredients, utensils, step_id) => {
    let result = {};
    /*
        ingredients.stepIds,
        ingredients.units,
        ingredients.values,
        ingredients.categorys,
        ingredients.names
        */
    /*
     utensils.stepIds,
     utensils.names
     */
    //ingredients
    let ingredientsStepIds = [];
    ingredients.names.forEach(() => {
        ingredientsStepIds.push(step_id);
    });
    if (ingredients.names.length > 0) {
        const newIngredients =
            await client.query('INSERT INTO step_ingredients (step_id,unit,value,category,name)' +
                ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::text[],$5::text[]) RETURNING *',
                [
                    ingredientsStepIds,
                    ingredients.units,
                    ingredients.values,
                    ingredients.categorys,
                    ingredients.names
                ]);
        result = {
            ...result,
            ingredients: newIngredients.rows
        };
    }
    let utensilsStepIds = [];
    utensils.names.forEach(() => {
        utensilsStepIds.push(step_id);
    });
    //utensils 
    if (utensils.names.length > 0) {
        const newUtensils =
            await client.query('INSERT INTO step_utensils (step_id,name)' +
                ' SELECT * FROM unnest($1::bigint[],$2::text[]) RETURNING *',
                [
                    utensilsStepIds,
                    utensils.names
                ]);

        result = {
            ...result,
            utensils: newUtensils.rows
        };
    }
    return result;
};