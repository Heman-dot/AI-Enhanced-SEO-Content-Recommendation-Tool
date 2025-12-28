const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');

// Get all drafts
router.get('/', async (req, res) => {
  try {
    const drafts = await Draft.find().sort({ updatedAt: -1 });
    res.json(drafts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific draft
router.get('/:id', async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json(draft);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new draft
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const draft = new Draft({ title, content });
    await draft.save();
    res.status(201).json(draft);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update draft content
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const draft = await Draft.findById(req.params.id);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    draft.title = title || draft.title;
    draft.content = content || draft.content;
    draft.updatedAt = new Date();
    await draft.save();
    res.json(draft);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a draft
router.delete('/:id', async (req, res) => {
  try {
    const draft = await Draft.findByIdAndDelete(req.params.id);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }
    res.json({ message: 'Draft deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

