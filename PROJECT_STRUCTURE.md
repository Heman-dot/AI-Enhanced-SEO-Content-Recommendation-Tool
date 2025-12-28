# Project Structure

```
SEO-Tool/
├── client/                          # React frontend application
│   ├── public/
│   │   └── index.html              # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js        # Main dashboard component
│   │   │   ├── Dashboard.css       # Dashboard styles
│   │   │   ├── Editor.js           # Content editor component
│   │   │   ├── Editor.css          # Editor styles
│   │   │   ├── SEOAnalysis.js      # SEO analysis display
│   │   │   ├── SEOAnalysis.css     # Analysis styles
│   │   │   ├── RevisionHistory.js  # Revision history panel
│   │   │   ├── RevisionHistory.css # History styles
│   │   │   ├── ComparisonReport.js # Improvement report
│   │   │   └── ComparisonReport.css # Report styles
│   │   ├── App.js                  # Root component
│   │   ├── App.css                 # Global app styles
│   │   ├── index.js                # React entry point
│   │   └── index.css               # Global styles
│   └── package.json                # Client dependencies
│
├── server/                          # Node.js/Express backend
│   ├── models/
│   │   └── Draft.js                # MongoDB schema (Draft & Revision)
│   ├── routes/
│   │   ├── drafts.js               # Draft CRUD endpoints
│   │   └── seo.js                  # SEO analysis endpoints
│   ├── services/
│   │   └── openaiService.js        # OpenAI API integration
│   ├── index.js                    # Express server entry point
│   ├── package.json                # Server dependencies
│   └── .env.example                # Environment variables template
│
├── package.json                     # Root package.json (dev scripts)
├── .gitignore                       # Git ignore rules
├── README.md                        # Main documentation
├── SETUP.md                         # Quick setup guide
├── SAMPLE_CONTENT.md                # Sample content examples
├── SEO_IMPROVEMENT_REPORT.md        # Sample improvement report
└── PROJECT_STRUCTURE.md             # This file

```

## Key Components

### Frontend (React)
- **Dashboard**: Main container managing state and API calls
- **Editor**: Simple textarea-based content editor
- **SEOAnalysis**: Displays SEO score, keywords, and recommendations
- **RevisionHistory**: Shows all revisions with scores
- **ComparisonReport**: Compares revisions and shows improvements

### Backend (Node.js/Express)
- **Draft Model**: MongoDB schema for drafts and revisions
- **Draft Routes**: CRUD operations for drafts
- **SEO Routes**: Analysis and comparison endpoints
- **OpenAI Service**: Handles API calls to OpenAI GPT-4

## Data Flow

1. User creates/edits content in React editor
2. Content saved to MongoDB via Express API
3. User requests SEO analysis
4. Server calls OpenAI API with content
5. Analysis results stored as revision in MongoDB
6. React displays score, keywords, and recommendations
7. User edits content and creates new revision
8. Comparison report shows improvements between revisions

## API Endpoints

### Drafts (`/api/drafts`)
- `GET /` - List all drafts
- `GET /:id` - Get specific draft
- `POST /` - Create new draft
- `PUT /:id` - Update draft
- `DELETE /:id` - Delete draft

### SEO (`/api/seo`)
- `POST /analyze/:draftId` - Analyze content and create revision
- `GET /compare/:draftId` - Compare revisions

## Technology Stack

### Frontend
- React 18
- Axios (HTTP client)
- CSS3 (Modern styling with gradients)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- OpenAI API (GPT-4)

## Database Schema

### Draft Document
```javascript
{
  title: String,
  content: String,
  revisions: [Revision],
  currentRevision: Number,
  createdAt: Date,
  updatedAt: Date
}
```

### Revision Document
```javascript
{
  content: String,
  seoScore: Number (0-100),
  keywords: [String],
  suggestions: [{
    type: String,
    message: String,
    priority: String,
    position: Number
  }],
  createdAt: Date
}
```

