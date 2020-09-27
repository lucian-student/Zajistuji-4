const { saveIngredients, saveUtensils } = require('./recipieFunctions');

module.exports.updateIngredients = async (client, recipie_id, ingredients) => {
    // ingredients={newIngredients,deleteIngredients,updateIngredients}
    let result;
    //update
    if (ingredients.updateIngredients) {
        const { names, categorys, ingredients_ids } = ingredients.updateIngredients;
        const updateIngredients =
            await client.query(
                'UPDATE recipie_ingredients SET' +
                ' name=new_values.name,' +
                ' category=new_values.category' +
                ' FROM (SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[]))' +
                ' AS new_values(ingredients_id,category,name)' +
                ' WHERE new_values.ingredients_id=recipie_ingredients.ingredients_id RETURNING *',
                [
                    ingredients_ids,
                    categorys,
                    names
                ]);
        result = {
            updateIngredients: updateIngredients.rows
        };
    }
    //create
    if (ingredients.newIngredients) {
        const newIngredients = await saveIngredients(client, recipie_id, ingredients.newIngredients);
        result = {
            ...result,
            newIngredients: newIngredients
        };
    }
    //delete 
    if (ingredients.deleteIngredients) {
        const { ingredients_ids } = ingredients.deleteIngredients;
        const deleteIngredients =
            await client.query('DELETE FROM recipie_ingredients WHERE ingredients_id' +
                ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING ingredients_id',
                [
                    ingredients_ids
                ]);
        result = {
            ...result,
            deleteIngredients: deleteIngredients.rows
        };
    }
    return result;
}

module.exports.updateUtensils = async (client, recipie_id, utensils) => {
    // utensils={newUtensils,deleteUtensils,updateUtensils}
    let result;
    //update
    if (utensils.updateUtensils) {
        const { names, utensils_ids } = utensils.updateUtensils;
        const updateUtensils =
            await client.query(
                'UPDATE recipie_utensils SET' +
                ' name=new_values.name' +
                ' FROM (SELECT * FROM unnest($1::bigint[],$2::text[]))' +
                ' AS new_values(utensils_id,name)' +
                ' WHERE new_values.utensils_id=recipie_utensils.utensils_id RETURNING *',
                [
                    utensils_ids,
                    names
                ]);
        result = {
            updateUtensils: updateUtensils.rows
        }
    }
    //create
    if (utensils.newUtensils) {
        const newUtensils = await saveUtensils(client, recipie_id, utensils.newUtensils);
        result = {
            ...result,
            newUtensils: newUtensils
        };
    }
    //delete
    if (utensils.deleteUtensils) {
        const { utensils_ids } = utensils.deleteUtensils;
        const deleteUtensils =
            await client.query('DELETE FROM recipie_utensils WHERE utensils_id' +
                ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING utensils_id',
                [
                    utensils_ids
                ]);
        result = {
            ...result,
            deleteUtensils: deleteUtensils.rows
        };
    }

    return result;
}