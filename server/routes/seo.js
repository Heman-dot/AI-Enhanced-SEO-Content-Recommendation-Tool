const express = require('express');
const router = express.Router();
const Draft = require('../models/Draft');
const { analyzeSEO } = require('../services/openaiService');

// Analyze content and add revision
router.post('/analyze/:draftId', async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.draftId);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }

    const content = req.body.content || draft.content;
    const seoData = await analyzeSEO(content, draft.title);
    
    await draft.addRevision(content, seoData);
    
    const updatedDraft = await Draft.findById(req.params.draftId);
    res.json({
      draft: updatedDraft,
      seoAnalysis: seoData
    });
  } catch (error) {
    console.error('SEO Analysis Error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get improvement comparison between revisions
router.get('/compare/:draftId', async (req, res) => {
  try {
    const draft = await Draft.findById(req.params.draftId);
    if (!draft) {
      return res.status(404).json({ error: 'Draft not found' });
    }

    if (draft.revisions.length < 2) {
      return res.json({
        message: 'Need at least 2 revisions to compare',
        revisions: draft.revisions
      });
    }

    const latest = draft.revisions[draft.revisions.length - 1];
    const previous = draft.revisions[draft.revisions.length - 2];

    const improvement = {
      scoreChange: latest.seoScore - previous.seoScore,
      scorePercentChange: ((latest.seoScore - previous.seoScore) / previous.seoScore) * 100,
      keywordsAdded: latest.keywords.filter(k => !previous.keywords.includes(k)),
      keywordsRemoved: previous.keywords.filter(k => !latest.keywords.includes(k)),
      latest: latest,
      previous: previous
    };

    res.json(improvement);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

