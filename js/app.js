
document.addEventListener("DOMContentLoaded", function () {

    // ADD RECIPE FORM
    const form = document.getElementById("recipeForm");

    if (form) {

        form.addEventListener("submit", function (event) {

            event.preventDefault();

            const recipeName =
                document.getElementById("recipeName").value.trim();

            const category =
                document.getElementById("category").value;

            const ingredients =
                document.getElementById("ingredients").value.trim();

            const instructions =
                document.getElementById("instructions").value.trim();

            const image =
                document.getElementById("image").value.trim();

            const newRecipe = {
                name: recipeName,
                category: category,
                ingredients: ingredients,
                instructions: instructions,
                image: image
            };

            let recipes =
                JSON.parse(localStorage.getItem("recipes")) || [];

            recipes.push(newRecipe);

            localStorage.setItem(
                "recipes",
                JSON.stringify(recipes)
            );

            document.getElementById("message").textContent =
                "✅ Recipe added successfully!";

            form.reset();

        });

    }

    // LOAD RECIPE DETAILS
    loadRecipeDetails();

});


// DISPLAY SELECTED RECIPE
function loadRecipeDetails() {

    const details =
        document.getElementById("recipeDetails");

    // Run only on the recipe details page
    if (!details) {
        return;
    }

    const selectedIndex =
        localStorage.getItem("selectedRecipeIndex");

    const recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];

    const recipe =
        selectedIndex !== null
            ? recipes[Number(selectedIndex)]
            : null;

    if (recipe) {

        // Convert ingredients into list items
        const ingredientsList =
            recipe.ingredients
                .split("\n")
                .filter(item => item.trim() !== "")
                .map(item => `<li>${item}</li>`)
                .join("");

        // Convert preparation steps into list items
        const instructionsList =
            recipe.instructions
                .split("\n")
                .filter(item => item.trim() !== "")
                .map(item => `<li>${item}</li>`)
                .join("");

        details.innerHTML = `

            <div class="details-image">
                🍽️
            </div>

            <h2>${recipe.name}</h2>

            <p class="details-category">
                ${recipe.category}
            </p>

            <h3>🥕 Ingredients</h3>

            <ul>
                ${ingredientsList}
            </ul>

            <h3>👩‍🍳 Preparation Steps</h3>

            <ol>
                ${instructionsList}
            </ol>

        `;

    } else {

        details.innerHTML = `

            <h2>Recipe Not Found</h2>

            <p>
                Sorry, this recipe could not be found.
                Please return to the Recipes page and select a recipe.
            </p>

        `;

    }

}
