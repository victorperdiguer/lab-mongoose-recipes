const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

mongoose.set('strictQuery', false);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    return Recipe.create({ title: 'Space Brownie', level: 'Easy Peasy', ingredients: ['chocolate', 'flour', 'weed', 'more weed', 'sugar'], cuisine: 'Home kitchen', dishType: 'dessert', duration: 30, creator: 'My pothead friend "El Rata"' });
  })
  .then(() => {
    return Recipe.insertMany(data);
  })
  .then(() => {
    Recipe.find({}, 'title').exec()
      .then(docs => console.log(docs))
  })
  .then(() => {
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
