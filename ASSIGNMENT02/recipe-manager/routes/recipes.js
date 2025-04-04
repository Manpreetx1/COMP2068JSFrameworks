const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET /recipes/add - Show Add Recipe form
router.get('/add', (req, res) => {
  res.render('addRecipe', { title: 'Add Recipe' });
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

// GET /recipes - Show all recipes (read-only)
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find().sort({ createdAt: -1 });
    res.render('recipes', { title: 'All Recipes', recipes });
  } catch (err) {
    res.status(500).send('Error loading recipes');
  }
});

// GET /recipes/edit/:id - Show Edit Recipe form
router.get('/edit/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).send('Recipe not found');
    res.render('editRecipe', { title: 'Edit Recipe', recipe });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading recipe for editing');
  }
});

// POST /recipes/edit/:id - Handle Edit form submission
router.post('/edit/:id', async (req, res) => {
  try {
    const { title, ingredients, instructions, category } = req.body;
    await Recipe.findByIdAndUpdate(req.params.id, { title, ingredients, instructions, category });
    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error updating recipe');
  }
});

// POST /recipes/delete/:id - Handle Delete
router.post('/delete/:id', async (req, res) => {
  try {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting recipe');
  }
});

// ✅ Export the router
module.exports = router;
