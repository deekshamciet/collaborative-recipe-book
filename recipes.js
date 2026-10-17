
const defaultRecipes = [
    {
        name: "Pizza",
        category: "Italian",
        image: "images/pizza.jpg",
        ingredients: "Pizza base\nTomato sauce\nCheese\nCapsicum\nOnion",
        instructions: "Spread tomato sauce on the pizza base.\nAdd cheese and vegetables.\nBake until the cheese melts.\nServe hot."
    },
    {
        name: "Veg Burger",
        category: "Fast Food",
        image: "images/burger.jpg",
        ingredients: "Burger bun\nVegetable patty\nTomato\nOnion\nLettuce",
        instructions: "Toast the burger bun.\nPlace the vegetable patty inside.\nAdd vegetables and sauce.\nClose the burger and serve."
    },
    {
        name: "Pasta",
        category: "Italian",
        image: "images/pasta.jpg",
        ingredients: "Pasta\nTomato sauce\nOnion\nGarlic\nCheese",
        instructions: "Boil the pasta.\nPrepare the sauce.\nMix pasta with the sauce.\nAdd cheese and serve."
    },
    {
        name: "Vegetable Salad",
        category: "Healthy",
        image: "images/salad.jpg",
        ingredients: "Carrot\nCucumber\nTomato\nOnion\nLemon juice",
        instructions: "Wash and cut all vegetables.\nMix the vegetables in a bowl.\nAdd lemon juice.\nServe fresh."
    }
];
function getRecipeImage(recipe) {

    if (recipe.name.toLowerCase() === "chocolate cake") {
        return "images/chocolate-cake.jpg";
    }

    return recipe.image || "images/pizza.jpg";
}

// INITIALIZE RECIPES WITHOUT DUPLICATES
function initializeRecipes() {

    let recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];

    const existingNames = new Set(
        recipes.map(recipe => recipe.name.toLowerCase())
    );

    const missingRecipes = defaultRecipes.filter(
        recipe => !existingNames.has(recipe.name.toLowerCase())
    );

    recipes = [...recipes, ...missingRecipes];

    // Update image paths for existing default recipes
    recipes = recipes.map(function (recipe) {

        const defaultRecipe = defaultRecipes.find(
            item =>
                item.name.toLowerCase() ===
                recipe.name.toLowerCase()
        );

        if (defaultRecipe) {
            return {
                ...recipe,
                image: defaultRecipe.image
            };
        }

        return recipe;
    });

    // IMPORTANT: Save the updated recipes
    localStorage.setItem(
        "recipes",
        JSON.stringify(recipes)
    );
}


// DISPLAY ALL RECIPES
function displayRecipes() {

    const container =
        document.getElementById("recipeContainer");

    if (!container) {
        return;
    }

    container.innerHTML = "";

    const recipes =
        JSON.parse(localStorage.getItem("recipes")) || [];

    recipes.forEach(function (recipe, index) {

        const card = document.createElement("div");
        card.className = "recipe-card";

        const image = document.createElement("img");
        image.className = "recipe-image";
        image.src = getRecipeImage(recipe);
        image.alt = recipe.name;

        // Fallback if an image file is missing
        image.onerror = function () {
            image.onerror = null;
            image.src = "images/pizza.jpg";
        };

        const title = document.createElement("h3");
        title.textContent = recipe.name;

        const description = document.createElement("p");
        description.textContent = recipe.category + " recipe";

        const category = document.createElement("span");
        category.textContent = recipe.category;

        const button = document.createElement("button");
        button.textContent = "View Recipe";

        button.addEventListener("click", function () {
            viewRecipe(index);
        });

        card.appendChild(image);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(category);
        card.appendChild(button);

        container.appendChild(card);
    });
}


// SEARCH RECIPES
function searchRecipes() {

    const input =
        document.getElementById("searchInput");

    if (!input) {
        return;
    }

    const filter = input.value.toLowerCase();

    const cards =
        document.getElementsByClassName("recipe-card");

    for (let i = 0; i < cards.length; i++) {

        const recipeName =
            cards[i]
                .getElementsByTagName("h3")[0]
                .textContent
                .toLowerCase();

        cards[i].style.display =
            recipeName.includes(filter) ? "" : "none";
    }
}


// OPEN RECIPE DETAILS
function viewRecipe(index) {

    localStorage.setItem(
        "selectedRecipeIndex",
        String(index)
    );

    window.location.href = "recipe-details.html";
}


// INITIALIZE AND DISPLAY
document.addEventListener("DOMContentLoaded", function () {

    initializeRecipes();

    displayRecipes();
});
