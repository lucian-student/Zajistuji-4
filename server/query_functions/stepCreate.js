module.exports = async (client, recipie_id, steps) => {
    let recipieIds = [];
    let count;
    for (count = 0; count < steps.names.length; count++) {
        recipieIds.push(recipie_id);
    }
    const {
        durations,
        names,
        descriptions,
        ingredients,
        utensils
    } = steps;

    const newSteps =
        await client.query('INSERT INTO recipie_steps (recipie_id,duration,name,description)' +
            ' SELECT * FROM unnest($1::bigint[],$2::time[],$3::text[],$4::text[]) RETURNING *',
            [
                recipieIds,
                durations,
                names,
                descriptions
            ]);

    // add recipie ingredients + recipie utensils

    let ingredientsData = {

    };
    let utensilsData = {

    };
    let count2;
    let count3;
    for (count = 0; count < newSteps.rows.length; count++) {
    }
    return newSteps.rows;

}