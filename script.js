function foodDetails(foodId) {
    console.log(foodId);
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodId}`)
        .then(res => res.json())
        .then(data => {
            displayFoodDetails(data.meals[0]);
        })
}
function displayFoodDetails(meal) {
    document.getElementById("food-details-display").innerHTML = `
    <div class="text-center">
        <img src="${meal.strMealThumb}" class="food-details-image">
        <h3 class="food-details-title">${meal.strMeal}</h3>
    </div>
    `
    document.getElementById("instruction-display").innerHTML = `
    <p class="instructions">${meal.strInstructions}</p>
    `
    console.log(meal);
    for (let i = 1; i <= 20; i++) {
        let ingredient = 'strIngredient' + i;
        let quantity = 'strMeasure' + i;
        if (meal[ingredient] === "" || meal[ingredient] == null) {
            break;
        }
    }
    document.getElementById("food-details").style.display = "block";
}
document.getElementById("search-button").addEventListener("click", function () {
    warning(""); // removing warning Text
    document.getElementById("food-details").style.display = 'none';

    const inputfoodName = document.getElementById("input-option").value;
    document.getElementById("input-option").value = "";
    const foodName = inputfoodName.trim();

    if (foodName === "") {
        warning("Please Enter a meal name.")
    } else {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodName}`)
            .then(res => res.json())
            .then(data => {
                if (data.meals === null) {
                    warning(`No meal found"${foodName}\". Please try again.`)
                } else {
                    processData(data.meals);
                }
            })
    }
})
function processData(meals) {
    // clearing previous search result
    document.getElementById("food-list").innerHTML = "";

    meals.forEach(meal => {
        const mealDiv = document.createElement("div");
        mealDiv.innerHTML = `
        <div onclick='foodDetails("${meal.idMeal}")' class="food-card">
            <img src="${meal.strMealThumb}" class="food-image">
            <h5 class="food-title">${meal.strMeal}</h5>
        </div>
        `
        document.getElementById("food-list").appendChild(mealDiv);
    });
}
function warning(warningText) {
    document.getElementById("warning-text").innerText = warningText;
}