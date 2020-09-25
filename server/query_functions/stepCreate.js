module.exports = async (client, recipie_id, steps) => {
    let recipieIds = [];
    let result;
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
    result = {
        steps: newSteps.rows
    };
    // add recipie ingredients + recipie utensils
    //step_id,unit,value,category,name
    let ingredientsData = {
        stepIds: [],
        units: [],
        values: [],
        categorys: [],
        names: []
    };
    //step_id,name
    let utensilsData = {
        stepIds: [],
        names: []
    };
    let count2;
    let count3;
    for (count = 0; count < newSteps.rows.length; count++) {
        if (ingredients[count]) {
            for (count2 = 0; count2 < ingredients[count].names.length; count2++) {
                ingredientsData.stepIds.push(newSteps.rows[count].step_id);
                ingredientsData.units.push(ingredients[count].units[count2]);
                ingredientsData.values.push(ingredients[count].values[count2]);
                ingredientsData.categorys.push(ingredients[count].categorys[count2]);
                ingredientsData.names.push(ingredients[count].names[count2]);
            }
        }
        if (utensils[count]) {
            for (count3 = 0; count3 < utensils[count].names.length; count3++) {
                utensilsData.stepIds.push(newSteps.rows[count].step_id);
                utensilsData.names.push(utensils[count].names[count3]);
            }
        }
    }
    //ingredients
    if (ingredientsData.stepIds.length > 0) {
        const newIngredients =
            await client.query('INSERT INTO step_ingredients (step_id,unit,value,category,name)' +
                ' SELECT * FROM unnest($1::bigint[],$2::text[],$3::text[],$4::text[],$5::text[]) RETURNING *',
                [
                    ingredientsData.stepIds,
                    ingredientsData.units,
                    ingredientsData.values,
                    ingredientsData.categorys,
                    ingredientsData.names
                ]);
        result = {
            ...result,
            ingredients: newIngredients.rows
        };
    }

    //utensils 
    if (utensilsData.stepIds.length > 0) {
        const newUtensils =
            await client.query('INSERT INTO step_utensils (step_id,name)' +
                ' SELECT * FROM unnest($1::bigint[],$2::text[]) RETURNING *',
                [
                    utensilsData.stepIds,
                    utensilsData.names
                ]);

        result = {
            ...result,
            utensils: newUtensils.rows
        };
    }
    return result;

}