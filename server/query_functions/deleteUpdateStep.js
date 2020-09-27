module.exports.update_ingredients = async (client, ingredients) => {
    const {
        ingredients_ids,
        units,
        values,
        categorys,
        names
    } = ingredients;
    const updateIngredients =
        await client.query(
            'UPDATE step_ingredients SET' +
            ' unit=new_values.unit,' +
            ' value=new_values.value,' +
            ' name=new_values.name,' +
            ' category=new_values.category' +
            ' FROM (SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::text[],$5::text[]))' +
            ' AS new_values(ingredients_id,unit,value,category,name)' +
            ' WHERE new_values.ingredients_id=step_ingredients.ingredients_id RETURNING *',
            [
                ingredients_ids,
                units,
                values,
                categorys,
                names
            ]);
    return updateIngredients.rows;
}
module.exports.delete_ingredients = async (client, ingredients) => {
    const {
        ingredients_ids
    } = ingredients;
    const deleteIngredients =
        await client.query('DELETE FROM step_ingredients WHERE ingredients_id' +
            ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING ingredients_id',
            [
                ingredients_ids
            ]);
    return deleteIngredients.rows;
}
module.exports.update_utensils = async (client, utensils) => {
    const { names, utensils_ids } = utensils;
    const updateUtensils =
        await client.query(
            'UPDATE step_utensils SET' +
            ' name=new_values.name' +
            ' FROM (SELECT * FROM unnest($1::bigint[],$2::text[]))' +
            ' AS new_values(utensils_id,name)' +
            ' WHERE new_values.utensils_id=step_utensils.utensils_id RETURNING *',
            [
                utensils_ids,
                names
            ]);
    return updateUtensils.rows;
}
module.exports.delete_utensils = async (client, utensils) => {
    const { utensils_ids } = utensils;
    const deleteUtensils =
        await client.query('DELETE FROM step_utensils WHERE utensils_id' +
            ' IN (SELECT * FROM unnest($1::bigint[])) RETURNING utensils_id',
            [
                utensils_ids
            ]);
    return deleteUtensils.rows;
}