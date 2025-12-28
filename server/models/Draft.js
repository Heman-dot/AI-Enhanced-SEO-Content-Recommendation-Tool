const mongoose = require('mongoose');

const revisionSchema = new mongoose.Schema({
  content: { type: String, required: true },
  seoScore: { type: Number, required: true },
  keywords: [String],
  suggestions: [{
    type: { type: String, enum: ['keyword', 'readability', 'structure', 'meta'], required: true },
    message: { type: String, required: true },
    priority: { type: String, enum: ['high', 'medium', 'low'], default: 'medium' },
    position: { type: Number }
  }],
  createdAt: { type: Date, default: Date.now }
});

const draftSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  revisions: [revisionSchema],
  currentRevision: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

draftSchema.methods.addRevision = function(content, seoData) {
  this.revisions.push({
    content,
    seoScore: seoData.score,
    keywords: seoData.keywords || [],
    suggestions: seoData.suggestions || []
  });
  this.currentRevision = this.revisions.length - 1;
  this.updatedAt = new Date();
  return this.save();
};

draftSchema.methods.getLatestRevision = function() {
  return this.revisions[this.currentRevision] || null;
};

module.exports = mongoose.model('Draft', draftSchema);

