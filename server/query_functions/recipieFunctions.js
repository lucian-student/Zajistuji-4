/*
ulozi ingredience pri vytvareni receptu
*/
module.exports.saveIngredients = async (client, recipie_id, ingredients) => {
    let recipieIds = [];
    let count;
    for (count=0; count < ingredients.names.length; count++) {
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
/*
ulozi nastroje pri vytvareni receptu
*/
module.exports.saveUtensils = async (client, recipie_id, utensils) => {
    let recipieIds = [];
    let count;
    for (count=0; count < utensils.names.length; count++) {
        recipieIds.push(recipie_id);
    }
    const { names } = utensils;

    const newUtensils =
        await client.query('INSERT INTO recipie_utensils (recipie_id,name)' +
            ' SELECT * FROM unnest($1::bigint[],$2::text[]) RETURNING *',
            [
                recipieIds,
                names
            ]);
    return newUtensils.rows;
};  