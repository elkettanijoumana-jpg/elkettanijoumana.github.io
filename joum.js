let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let input = document.getElementById("user-input");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s="; //api used: The MealDB

function searchMeal() {
  let userValue = input.value.trim();
  if (userValue.length === 0) {
    result.innerHTML = "<h3>Input Field Cannot be Empty</h3>";
    return;
  }

  fetch(url + userValue)
    .then(response => response.json())
    .then(data => {
      if (!data.meals) {
        result.innerHTML = "<h3>No Meal Found</h3>";
        return;
      }
      let meal = data.meals[0];
      let ingredients = [];

      //make sure i finished this
      for (let i = 1; i <= 20; i++) {
        let ingredient = meal["strIngredient" + i];
        let measure = meal["strMeasure" + i];
        if (ingredient && ingredient.trim()) {
          ingredients.push(`${measure} ${ingredient}`);
        }
      }

      result.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}" width="200">
        <h2>${meal.strMeal}</h2>
        <h4>${meal.strArea}</h4>
        <h3>Ingredients:</h3>
        <ul>${ingredients.map(i => `<li>${i}</li>`).join('')}</ul>
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
      `;
    })
    .catch(() => {
      result.innerHTML = "<h3>Invalid Input</h3>";
    });
}

searchBtn.addEventListener("click", searchMeal);
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchMeal();
  } //check it's working
});
