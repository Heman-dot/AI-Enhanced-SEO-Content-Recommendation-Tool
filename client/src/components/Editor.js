import React from 'react';
import './Editor.css';

function Editor({ content, onChange }) {
  return (
    <div className="editor-container">
      <textarea
        className="content-editor"
        value={content}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write or paste your content here..."
        rows="15"
      />
    </div>
  );
}

export default Editor;

