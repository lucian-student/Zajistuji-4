module.exports = async (client, recipie_id, ingredients) => {
    let recipieIds = [];
    let count;
    for (count; count < ingredients.names.length; count++) {
        recipieIds.push(recipie_id);
    }
    const { names, categorys } = ingredients;
    const newIngredients =
        await client.query('INSERT INTO recipie_ingredients (recipie_id,category,name)' +
            ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[]) RETURNING *',
            [
                recipieIds,
                categorys,
                names
            ]);
    return newIngredients.rows;
};