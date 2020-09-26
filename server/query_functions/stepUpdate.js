const stepSave = require('./stepsSave');
const { saveIngredients, saveUtensils } = require('./stepUpdateFunctions');
const {
    update_ingredients,
    update_utensils,
    delete_ingredients,
    delete_utensils
} = require('./deleteUpdateStep');
module.exports = async (client, recipie_id, steps) => {
    let result;
    const stepResult = await stepSave(client, recipie_id, steps);
    if (JSON.stringify(stepResult) !== '{}') {
        result = {
            steps: stepResult
        }
    }
    /* const {
         newSteps,
         updateSteps,
         deleteSteps,
         ingredients,
         utensils
     } = steps;*/
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
    if (stepResult.newsSteps) {
        const {
            ingredients,
            utensils
        } = steps.newSteps;
        let count;
        let count2;
        let count3;
        for (count = 0; count < stepResult.newSteps.length; count++) {
            if (ingredients[count]) {
                for (count2 = 0; count2 < ingredients[count].names.length; count2++) {
                    ingredientsData.stepIds.push(stepResult.newSteps[count].step_id);
                    ingredientsData.units.push(ingredients[count].units[count2]);
                    ingredientsData.values.push(ingredients[count].values[count2]);
                    ingredientsData.categorys.push(ingredients[count].categorys[count2]);
                    ingredientsData.names.push(ingredients[count].names[count2]);
                }
            }
            if (utensils[count]) {
                for (count3 = 0; count3 < utensils[count].names.length; count3++) {
                    utensilsData.stepIds.push(stepResult.newSteps[count].step_id);
                    utensilsData.names.push(utensils[count].names[count3]);
                }
            }
        }
        if (steps.ingredients.newIngredients) {
            ingredientsData.stepIds = ingredientsData.stepIds.concat(steps.ingredients.newIngredients.stepIds);
            ingredientsData.units = ingredientsData.units.concat(steps.ingredients.newIngredients.units);
            ingredientsData.values = ingredientsData.values.concat(steps.ingredients.newIngredients.values);
            ingredientsData.categorys = ingredientsData.categorys.concat(steps.ingredients.newIngredients.categorys);
            ingredientsData.names = ingredientsData.names.concat(steps.ingredients.newIngredients.names);
        }
        if (steps.utensils.newUtensils) {
            utensilsData.stepIds = utensilsData.stepIds.concat(steps.utensils.newUtensils.stepIds);
            utensilsData.names = utensilsData.names.concat(steps.utensils.newUtensils.names);
        }
    }
    if (ingredientsData.length > 0) {
        const newIngredients = await saveIngredients(client, ingredientsData);
    }
    if (utensilsData.length > 0) {
        const newUtensils = await saveUtensils(client, utensilsData);
    }
    if (steps.ingredients.delteIngredients) {
        const deleteIngredients = await delete_ingredients(client, steps.ingredients.delteIngredients);
    }
    if (steps.ingredients.updateIngredients) {
        const updateIngredients = await update_ingredients(client, steps.ingredients.updateIngredients);
    }
    if (steps.utensils.deleteUtensils) {
        const deleteUtensils = await delete_utensils(client, steps.utensils.deleteUtensils);
    }
    if (steps.utensils.updateUtensils) {
        const updateUtensils = await update_utensils(client, steps.utensils.updateUtensils);
    }
    return result;
}