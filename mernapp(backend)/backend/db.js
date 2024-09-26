const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://bilo12139:loser7.0@cluster0.pwzyy.mongodb.net/gofood?retryWrites=true&w=majority&appName=Cluster0';

const mongoDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Fetch the collection and data using async/await
    const db = mongoose.connection.db;
    const fetchedItems = await db.collection('food_items').find({}).toArray();
    const fetchedCategory = await db.collection('foodCategory').find({}).toArray();

    if (fetchedItems && fetchedCategory) {
      global.food_items = fetchedItems;
      global.foodCategory = fetchedCategory;
      console.log('Global variables set for food_items and foodCategory');
    } else {
      console.error('No data found in the collections');
    }
  } catch (error) {
    console.error('Error connecting to MongoDB or fetching data:', error);
  }
};

module.exports = mongoDB;
