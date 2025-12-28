import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import Editor from './Editor';
import SEOAnalysis from './SEOAnalysis';
import RevisionHistory from './RevisionHistory';
import ComparisonReport from './ComparisonReport';

// Use full URL with CORS enabled on server
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function Dashboard() {
  const [drafts, setDrafts] = useState([]);
  const [currentDraft, setCurrentDraft] = useState(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [seoData, setSeoData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [comparisonData, setComparisonData] = useState(null);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/drafts`);
      setDrafts(response.data);
    } catch (err) {
      setError('Failed to fetch drafts: ' + err.message);
    }
  };

  const handleCreateDraft = async () => {
    if (!title.trim() || !content.trim()) {
      setError('Please provide both title and content');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(`${API_BASE_URL}/drafts`, {
        title,
        content
      });
      setCurrentDraft(response.data);
      setDrafts([response.data, ...drafts]);
      setSuccess('Draft created successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to create draft: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateDraft = async () => {
    if (!currentDraft) return;

    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`${API_BASE_URL}/drafts/${currentDraft._id}`, {
        title,
        content
      });
      setCurrentDraft(response.data);
      setDrafts(drafts.map(d => d._id === response.data._id ? response.data : d));
      setSuccess('Draft updated successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update draft: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (!currentDraft) {
      setError('Please create or select a draft first');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await axios.post(
        `${API_BASE_URL}/seo/analyze/${currentDraft._id}`,
        { content }
      );
      setCurrentDraft(response.data.draft);
      setSeoData(response.data.seoAnalysis);
      setDrafts(drafts.map(d => d._id === response.data.draft._id ? response.data.draft : d));
      setSuccess('SEO analysis completed!');
      setTimeout(() => setSuccess(''), 3000);
      fetchComparison();
    } catch (err) {
      setError('Failed to analyze content: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchComparison = async () => {
    if (!currentDraft) return;

    try {
      const response = await axios.get(`${API_BASE_URL}/seo/compare/${currentDraft._id}`);
      setComparisonData(response.data);
    } catch (err) {
      // It's okay if comparison fails (e.g., not enough revisions)
      console.log('Comparison not available:', err.message);
    }
  };

  const handleSelectDraft = async (draftId) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`${API_BASE_URL}/drafts/${draftId}`);
      const draft = response.data;
      setCurrentDraft(draft);
      setTitle(draft.title);
      setContent(draft.content);
      
      // Load latest revision SEO data if available
      if (draft.revisions && draft.revisions.length > 0) {
        const latest = draft.revisions[draft.revisions.length - 1];
        setSeoData({
          score: latest.seoScore,
          keywords: latest.keywords,
          suggestions: latest.suggestions
        });
      } else {
        setSeoData(null);
      }
      
      fetchComparison();
    } catch (err) {
      setError('Failed to load draft: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDraft = async (draftId) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) return;

    try {
      await axios.delete(`${API_BASE_URL}/drafts/${draftId}`);
      setDrafts(drafts.filter(d => d._id !== draftId));
      if (currentDraft && currentDraft._id === draftId) {
        setCurrentDraft(null);
        setTitle('');
        setContent('');
        setSeoData(null);
        setComparisonData(null);
      }
      setSuccess('Draft deleted successfully!');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete draft: ' + err.message);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <div className="header">
          <h1>🎯 SEO Content Recommendation Tool</h1>
          <p>AI-Powered Content Optimization & SEO Analysis</p>
        </div>

        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}

        <div className="dashboard-grid">
          <div className="card">
            <h2>📝 Content Editor</h2>
            <div className="form-group">
              <label>Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter content title..."
              />
            </div>
            <div className="form-group">
              <label>Content</label>
              <Editor content={content} onChange={setContent} />
            </div>
            <div className="editor-actions">
              {currentDraft ? (
                <>
                  <button
                    className="btn btn-primary"
                    onClick={handleUpdateDraft}
                    disabled={loading}
                  >
                    {loading ? 'Updating...' : 'Update Draft'}
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={handleAnalyze}
                    disabled={loading}
                  >
                    {loading ? 'Analyzing...' : '🔍 Analyze SEO'}
                  </button>
                </>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={handleCreateDraft}
                  disabled={loading}
                >
                  {loading ? 'Creating...' : 'Create Draft'}
                </button>
              )}
            </div>
          </div>

          <div className="card">
            <h2>📊 SEO Analysis</h2>
            {seoData ? (
              <SEOAnalysis seoData={seoData} />
            ) : (
              <div className="empty-state">
                <h3>No Analysis Yet</h3>
                <p>Create a draft and click "Analyze SEO" to get started</p>
              </div>
            )}
          </div>
        </div>

        {currentDraft && (
          <>
            <div className="dashboard-grid">
              <div className="card">
                <h2>📜 Revision History</h2>
                <RevisionHistory
                  draft={currentDraft}
                  onSelectRevision={(revision) => {
                    setContent(revision.content);
                    setSeoData({
                      score: revision.seoScore,
                      keywords: revision.keywords,
                      suggestions: revision.suggestions
                    });
                  }}
                />
              </div>

              <div className="card">
                <h2>📋 Drafts</h2>
                <div className="drafts-list">
                  {drafts.length === 0 ? (
                    <div className="empty-state">
                      <p>No drafts yet. Create one to get started!</p>
                    </div>
                  ) : (
                    drafts.map(draft => (
                      <div
                        key={draft._id}
                        className={`draft-item ${currentDraft && currentDraft._id === draft._id ? 'active' : ''}`}
                        onClick={() => handleSelectDraft(draft._id)}
                      >
                        <div className="draft-title">{draft.title}</div>
                        <div className="draft-meta">
                          <span>
                            {draft.revisions.length} revision{draft.revisions.length !== 1 ? 's' : ''}
                          </span>
                          <span>
                            {draft.revisions.length > 0 
                              ? `Latest: ${draft.revisions[draft.revisions.length - 1].seoScore}/100`
                              : 'Not analyzed'
                            }
                          </span>
                          <button
                            className="btn btn-danger"
                            style={{ padding: '5px 10px', fontSize: '0.8rem' }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteDraft(draft._id);
                            }}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {comparisonData && comparisonData.latest && (
              <ComparisonReport comparisonData={comparisonData} />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

