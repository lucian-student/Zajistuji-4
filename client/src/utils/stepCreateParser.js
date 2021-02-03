/*

predela format dat kroku na prijatelny pro server
*/
function StepCreateParser(ingredients, utensils) {
    let stepIngredientsNames = [];
    let stepIngredientsCategorys = [];
    let stepIngredientsUnits = [];
    let stepIngredientsValues = [];

    ingredients.forEach((ingredients) => {
        stepIngredientsNames.push(ingredients.name);
        stepIngredientsCategorys.push(ingredients.category);
        stepIngredientsUnits.push(ingredients.unit);
        stepIngredientsValues.push(ingredients.value);
    });

    const stepIngredients = {
        names: stepIngredientsNames,
        categorys: stepIngredientsCategorys,
        units: stepIngredientsUnits,
        values: stepIngredientsValues
    }

    let stepUtensilsNames = [];

    utensils.forEach((utensil) => {
        stepUtensilsNames.push(utensil.name);
    });
    const stepUtensils = {
        names: stepUtensilsNames
    }
    return {
        ingredients: stepIngredients,
        utensils: stepUtensils
    };
}
/*
        ingredients.units,
        ingredients.values,
        ingredients.categorys,
        ingredients.names
*/
/*
     utensils.names
*/
export default StepCreateParser;