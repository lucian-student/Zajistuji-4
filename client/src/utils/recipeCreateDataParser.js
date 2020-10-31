function RecipeCreateDataParser(ingredients, utensils, steps) {
    let ingredientsNames = [];
    let ingredientsCategorys = [];
    ingredients.forEach((ingredients) => {
        ingredientsNames.push(ingredients.name);
        ingredientsCategorys.push(ingredients.category);
    });
    const parsedIngreditens = {
        names: ingredientsNames,
        categorys: ingredientsCategorys
    }

    let utensilsNames = [];
    utensils.forEach((utensil) => {
        utensilsNames.push(utensil.name);
    });
    const parsedUtensils = { names: utensilsNames };

    let stepNames = [];
    let stepDurations = [];
    let stepDescriptions = [];
    let stepIngredients = [];
    let stepUtensils = [];
    steps.forEach((step) => {
        stepNames.push(step.name);
        stepDurations.push(step.duration);
        stepDescriptions.push(step.description);

        let stepIngredientsNames = [];
        let stepIngredientsCategorys = [];
        let stepIngredientsUnits = [];
        let stepIngredientsValues = [];

        step.ingredients.forEach((ingredients) => {
            stepIngredientsNames.push(ingredients.name);
            stepIngredientsCategorys.push(ingredients.category);
            stepIngredientsUnits.push(ingredients.unit);
            stepIngredientsValues.push(ingredients.value);
        });
        stepIngredients.push({
            units: stepIngredientsUnits,
            values: stepIngredientsValues,
            categorys: stepIngredientsCategorys,
            names: stepIngredientsNames
        });
        let stepUtensilsNames = [];
        step.utensils.forEach((utensil) => {
            stepUtensilsNames.push(utensil.name);
        });
        stepUtensils.push({ names: stepUtensilsNames });
    });
    const parsedSteps = {
        names: stepNames,
        durations: stepDurations,
        descriptions: stepDescriptions,
        ingredients: stepIngredients,
        utensils: stepUtensils
    };
    return {
        ingredients: parsedIngreditens,
        utensils: parsedUtensils,
        steps: parsedSteps
    }
}

export default RecipeCreateDataParser;


/*
{
    "name": "Salmon sushi",
    "category": "Seafood",
    "description": "Cook it until its done!",
    "imageUrl": null,
    "ingredients": {
        "names": [
            "sushi",
            "salmon"
        ],
        "categorys": [
            "seafood",
            "fish"
        ]
    },
    "utensils": {
        "names": [
            "pan",
            "knife"
        ]
    },
    "steps": {
        "durations": [
            "00:45:00",
            "00:35:00",
            "00:25:00"
        ],
        "names": [
            "roll the sushi",
            "cook fish",
            "seasoning"
        ],
        "descriptions": [
            "sushi needs to be nice and crispy",
            "dont cook it raw!",
            "season well and make sure it tastes good"
        ],
        "ingredients": [
            {
                "units": [
                    "g",
                    "kg",
                    "ml"
                ],
                "values": [
                    "200",
                    "1kg",
                    "100"
                ],
                "categorys": [
                    "seafood",
                    "lentils",
                    "sauce"
                ],
                "names": [
                    "sushi",
                    "rice",
                    "soyasauce"
                ]
            },
            {
                "units": [
                    "kg"
                ],
                "values": [
                    "1"
                ],
                "categorys": [
                    "fish"
                ],
                "names": [
                    "salamon"
                ]
            },
            {
                "units": [
                    "g"
                ],
                "values": [
                    "5"
                ],
                "categorys": [
                    "seasoning"
                ],
                "names": [
                    "salt"
                ]
            }
        ],
        "utensils": [
            null,
            {
                "names":[
                    "pan"
                ]
            },
            null
        ]
    }
}
*/