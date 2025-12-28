import React from 'react';
import './ComparisonReport.css';

function ComparisonReport({ comparisonData }) {
  if (!comparisonData || !comparisonData.latest) {
    return null;
  }

  const { scoreChange, scorePercentChange, keywordsAdded, keywordsRemoved, latest, previous } = comparisonData;
  const isPositive = scoreChange > 0;

  return (
    <div className="comparison-report">
      <div className="comparison-header">
        <h2>📈 Improvement Report</h2>
        <div className={`score-change ${isPositive ? 'positive' : 'negative'}`}>
          {isPositive ? '↑' : '↓'} {Math.abs(scoreChange)} points
          {scorePercentChange !== undefined && (
            <span className="percent-change">
              ({isPositive ? '+' : ''}{scorePercentChange.toFixed(1)}%)
            </span>
          )}
        </div>
      </div>

      <div className="comparison-sections">
        <div className="comparison-section">
          <h3>Score Comparison</h3>
          <div className="score-comparison">
            <div className="score-box">
              <div className="score-label">Previous</div>
              <div className="score-value">{previous.seoScore}/100</div>
            </div>
            <div className="score-arrow">→</div>
            <div className="score-box">
              <div className="score-label">Latest</div>
              <div className="score-value latest">{latest.seoScore}/100</div>
            </div>
          </div>
        </div>

        {(keywordsAdded.length > 0 || keywordsRemoved.length > 0) && (
          <div className="comparison-section">
            <h3>Keyword Changes</h3>
            <div className="keywords-comparison">
              {keywordsAdded.length > 0 && (
                <div className="keywords-added">
                  <h4>✓ Added Keywords</h4>
                  <div className="keyword-list">
                    {keywordsAdded.map((kw, i) => (
                      <span key={i} className="keyword-tag added">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
              {keywordsRemoved.length > 0 && (
                <div className="keywords-removed">
                  <h4>✗ Removed Keywords</h4>
                  <div className="keyword-list">
                    {keywordsRemoved.map((kw, i) => (
                      <span key={i} className="keyword-tag removed">{kw}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="comparison-section">
          <h3>Latest Recommendations</h3>
          <div className="suggestions-list">
            {latest.suggestions && latest.suggestions.slice(0, 5).map((suggestion, index) => (
              <div key={index} className={`suggestion-item ${suggestion.priority}-priority`}>
                <span className="suggestion-type">{suggestion.type}</span>
                <div className="suggestion-message">{suggestion.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComparisonReport;

