require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.static('public'));
app.set("view engine", 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
	res.render('home', {title: "Reciptes"});
});

app.get('/random', (req, res) => {
	let randomRecipe = "https://api.spoonacular.com/recipes/random?apiKey=" + process.env.API_KEY;
	let recipe = null;

	axios.get(randomRecipe)
		.then((response) => {
			recipe = response.data.recipes[0];
			// console.log(response.data.recipes[0].title);
			// console.log(response.data.recipes[0].readyInMinutes);
			// console.log(response.data.recipes[0].dishTypes);
			// console.log(response.data.recipes[0].diets);
			// console.log(response.data.recipes[0].servings);
			// console.log(response.data.recipes[0].image);

			// let ingredients = response.data.recipes[0].extendedIngredients;
			// ingredients.forEach(item => {
			// 	console.log(item.name);
			// 	console.log(item.amount);
			// 	console.log(item.unit);
			// 	console.log("-------");
			// })

			// console.log(response.data.recipes[0].extendedIngredients);

			// console.log(recipe);
			res.render('random', {title: "Random recipe", randomRecipe: recipe});
		})
		.catch((error) => {
			console.log(error);
		});


});

app.listen(PORT, () => {
	console.log(`${PORT} port is running`);
});