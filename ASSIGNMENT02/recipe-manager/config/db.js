const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://preetmanx1:NUdETqYp2VmNlZKN@recipedb.89hehbg.mongodb.net/recipes?retryWrites=true&w=majority');
    console.log('✅ MongoDB Connected to RecipeDB');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
