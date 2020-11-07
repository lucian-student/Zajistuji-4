const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const cookieParser = require('cookie-parser');
//midelware
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use('/users', require('./apis/users'));
app.use('/token', require('./apis/token'));
app.use('/utensils', require('./apis/utensils'));
app.use('/ingredients', require('./apis/ingredients'));
app.use('/recipies', require('./apis/recipies'));
app.use('/recipeUpdate', require('./apis/updateRecipe'));
app.use('/recipieQuery', require('./apis/recipieQueries'));
app.use('/comments', require('./apis/comments'));
app.use('/recipie_likes', require('./apis/recipieLikes'));
app.use('/shared_recipies', require('./apis/shareRecipies'));
app.use('/shared_recipie_query', require('./apis/sharedRecipieQueries'));
app.use('/comments_queries', require('./apis/commentsQueries'));
app.use('/recipe_ingredients', require('./apis/recipeIngredinets'));
app.use('/recipe_utensils', require('./apis/recipeUtensils'));
//get

//post

//put

//delete

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`Server running on PORT ${PORT} 🔥`));