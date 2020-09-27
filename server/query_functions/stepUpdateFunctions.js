module.exports.saveIngredients = async (client, ingredients) => {
    const {
        stepIds,
        units,
        values,
        categorys,
        names
    } = ingredients;
    const newIngredients =
        await client.query('INSERT INTO step_ingredients (step_id,unit,value,category,name)' +
            ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::text[],$5::text[]) RETURNING *',
            [
                stepIds,
                units,
                values,
                categorys,
                names
            ]);
    return newIngredients.rows;
}

module.exports.saveUtensils = async (client, utensils) => {
    const {
        stepIds,
        names
    } = utensils;
    const newUtensils =
        await client.query('INSERT INTO step_utensils (step_id,name)' +
            ' SELECT * FROM unnest($1::bigint[],$2::text[]) RETURNING *',
            [
                stepIds,
                names
            ]);
    return newUtensils.rows;
}