/*
    Author: Leigh
    JS for the recipe site
*/
// Variables
const recipeBlock = document.getElementById("recipe-images")
const recipeOne = document.getElementById("recipe-1");
const recipeTwo = document.getElementById("recipe-2");
const recipeThree = document.getElementById("recipe-3");
const displayArray = [recipeOne, recipeTwo, recipeThree];
const userIngredient = document.getElementById("submit-ingredient")
const recipeURL =  "https://api.spoonacular.com/recipes/findByIngredients?apiKey=8171f594d96e4d8e8da36ccaee1f37ea&number=3&ingredients="

// catch user submit and send append search parameter
userIngredient.addEventListener('submit', function(event) {
    event.preventDefault();
    let ingredient = userIngredient.elements['ingred'];
    let searchURL = recipeURL + ingredient.value;
    // should do some error checking
    getRecipes(searchURL)
});
// retrieve 3 recipes
async function updateRecipe(URL) {
    return fetch(URL).then(response => response.json())
}
function getRecipes(URL) {
    updateRecipe(URL).then(
        function(data){
            if (data.length > 0) {
            //loop through 3 returned recipes
                for(let i = 0; i < data.length; i++){
                    // add HTML header and image elements to display returned data
                    displayArray[i].innerHTML = "<h2>" + data[i].title + "</h2>" +
                    "<img src=" + data[i].image + " alt=" + data[i].title + " >" +
                    "<h3> Other ingredients required! </h3>";
                    // create a list of other ingredients required
                    let missNum = data[i].missedIngredients.length
                    // if there are other ingredients required display them in a ul
                    if (missNum > 0){
                        let listNode = document.createElement("ul")
                        for(let j = 0; j < missNum; j++){
                            let newItem = document.createElement("li")
                            let text = document.createTextNode(data[i].missedIngredients[j].name);
                            newItem.appendChild(text)
                            listNode.appendChild(newItem);
                        }
                        displayArray[i].appendChild(listNode)
                    } 
                }
            } else {
                //Invalid input or server error, for this purpose just deal with invalid input
                displayArray[0].innerHTML = "<h2> Oh no! we dont have a recipe for that! please try again </h2>"
                displayArray[1].innerHTML = ""
                displayArray[2].innerHTML = ""
            }
            // change display from none to display recipes
            recipeBlock.style.display = "grid";
        }
    )
}
// display 3 recipe's 
