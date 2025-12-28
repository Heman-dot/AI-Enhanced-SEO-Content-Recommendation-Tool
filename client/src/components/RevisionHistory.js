import React from 'react';
import './RevisionHistory.css';

function RevisionHistory({ draft, onSelectRevision }) {
  if (!draft.revisions || draft.revisions.length === 0) {
    return (
      <div className="empty-state">
        <p>No revisions yet. Analyze your content to create the first revision.</p>
      </div>
    );
  }

  return (
    <div className="revisions-list">
      {draft.revisions.map((revision, index) => (
        <div
          key={index}
          className={`revision-item ${index === draft.currentRevision ? 'active' : ''}`}
          onClick={() => onSelectRevision(revision)}
        >
          <div className="revision-header">
            <div className="revision-title">Revision #{index + 1}</div>
            <div className="revision-score">{revision.seoScore}/100</div>
          </div>
          <div className="revision-date">
            {new Date(revision.createdAt).toLocaleString()}
          </div>
          <div className="revision-keywords">
            {revision.keywords && revision.keywords.slice(0, 5).map((kw, i) => (
              <span key={i} className="revision-keyword-tag">{kw}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default RevisionHistory;

