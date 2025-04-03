const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /recipes/add - Show Add Recipe form
router.get('/add', (req, res) => {
  res.render('addRecipe', { title: 'Add Recipe' });
});

// GET /recipes - Show all recipes (read-only)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render('recipes', { title: 'All Recipes', recipes });
  } catch (err) {
    res.status(500).send('Error loading recipes');
  }
});

// POST /recipes/add - Handle Add Recipe form submission
router.post('/add', async (req, res) => {
  try {
    const { title, ingredients, instructions, category } = req.body;
    const newRecipe = new Recipe({ title, ingredients, instructions, category });
    await newRecipe.save();
    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error saving recipe');
  }
});

// ✅ Export the router after all routes are declared
module.exports = router;
