import React from 'react';
import './SEOAnalysis.css';

function SEOAnalysis({ seoData }) {
  const getScoreClass = (score) => {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-medium';
    return 'score-low';
  };

  const getPriorityClass = (priority) => {
    return `suggestion-item ${priority}-priority`;
  };

  return (
    <div className="seo-analysis">
      <div className="seo-score">
        <div className={`score-circle ${getScoreClass(seoData.score)}`}>
          <div>
            <div className="score-value">{seoData.score}</div>
            <div className="score-label">/ 100</div>
          </div>
        </div>
      </div>

      {seoData.keywords && seoData.keywords.length > 0 && (
        <div className="keywords-section">
          <h3>🔑 Suggested Keywords</h3>
          <div className="keywords-list">
            {seoData.keywords.map((keyword, index) => (
              <span key={index} className="keyword-tag">
                {keyword}
              </span>
            ))}
          </div>
        </div>
      )}

      {seoData.suggestions && seoData.suggestions.length > 0 && (
        <div className="suggestions-section">
          <h3>💡 Recommendations</h3>
          <div className="suggestions-list">
            {seoData.suggestions.map((suggestion, index) => (
              <div key={index} className={getPriorityClass(suggestion.priority)}>
                <span className="suggestion-type">{suggestion.type}</span>
                <div className="suggestion-message">{suggestion.message}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {seoData.analysis && (
        <div className="analysis-section">
          <h3>📋 Overall Analysis</h3>
          <p className="analysis-text">{seoData.analysis}</p>
        </div>
      )}
    </div>
  );
}

export default SEOAnalysis;

