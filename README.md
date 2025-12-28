# AI-Enhanced SEO Content Recommendation Tool

A full-stack web application that helps content creators optimize their content for SEO using AI-powered analysis and recommendations. Built with React.js, Node.js, Express.js, MongoDB, and OpenAI API.

## Features

- 📝 **Content Editor**: Create and edit content drafts with a clean, intuitive interface
- 🤖 **AI-Powered SEO Analysis**: Get instant SEO scores and recommendations using OpenAI GPT-4
- 🔑 **Keyword Suggestions**: Receive relevant keyword recommendations for your content
- 💡 **Actionable Recommendations**: Get specific suggestions for keyword optimization, readability, content structure, and meta information
- 📊 **Revision Tracking**: Track multiple revisions of your content and monitor SEO improvements
- 📈 **Improvement Reports**: Compare revisions to see how your SEO score changes over time
- 💾 **Draft Management**: Save, update, and manage multiple content drafts

## Tech Stack

### Frontend
- React.js 18
- Axios for API calls
- Modern CSS with gradient designs

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- OpenAI API (GPT-4)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (running locally or MongoDB Atlas connection string)
- OpenAI API key

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SEO-Tool
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the `server` directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/seo-tool
   OPENAI_API_KEY=your_openai_api_key_here
   ```
   
   Or if using MongoDB Atlas:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/seo-tool
   ```

4. **Start MongoDB** (if using local MongoDB)
   ```bash
   # macOS
   brew services start mongodb-community
   
   # Linux
   sudo systemctl start mongod
   
   # Windows
   net start MongoDB
   ```

## Running the Application

### Option 1: Run both server and client concurrently
```bash
# From the root directory
npm run dev
```

### Option 2: Run separately

**Terminal 1 - Start the server:**
```bash
cd server
npm run dev
```

**Terminal 2 - Start the client:**
```bash
cd client
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Usage

1. **Create a Draft**
   - Enter a title for your content
   - Write or paste your content in the editor
   - Click "Create Draft"

2. **Analyze SEO**
   - With a draft selected, click "🔍 Analyze SEO"
   - Wait for the AI analysis (this may take a few seconds)
   - Review your SEO score (0-100), keywords, and recommendations

3. **Make Improvements**
   - Read through the recommendations
   - Edit your content based on the suggestions
   - Click "Update Draft" to save changes
   - Click "Analyze SEO" again to see your improved score

4. **Track Progress**
   - View all revisions in the Revision History panel
   - Click on any revision to view its content and SEO data
   - Check the Improvement Report to see score changes between revisions

5. **Manage Drafts**
   - View all your drafts in the Drafts panel
   - Click on any draft to load it
   - Delete drafts you no longer need

## API Endpoints

### Drafts
- `GET /api/drafts` - Get all drafts
- `GET /api/drafts/:id` - Get a specific draft
- `POST /api/drafts` - Create a new draft
- `PUT /api/drafts/:id` - Update a draft
- `DELETE /api/drafts/:id` - Delete a draft

### SEO Analysis
- `POST /api/seo/analyze/:draftId` - Analyze content and create a revision
- `GET /api/seo/compare/:draftId` - Get comparison between revisions

## Project Structure

```
SEO-Tool/
├── server/
│   ├── models/
│   │   └── Draft.js          # MongoDB schema for drafts and revisions
│   ├── routes/
│   │   ├── drafts.js         # Draft CRUD endpoints
│   │   └── seo.js            # SEO analysis endpoints
│   ├── services/
│   │   └── openaiService.js  # OpenAI API integration
│   ├── index.js              # Express server setup
│   └── package.json
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Dashboard.js          # Main dashboard component
│   │   │   ├── Editor.js             # Content editor
│   │   │   ├── SEOAnalysis.js        # SEO score and recommendations display
│   │   │   ├── RevisionHistory.js    # Revision history panel
│   │   │   └── ComparisonReport.js   # Improvement report
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── package.json
└── README.md
```

## Database Schema

### Draft Model
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

### Revision Model
```javascript
{
  content: String,
  seoScore: Number (0-100),
  keywords: [String],
  suggestions: [{
    type: String (keyword|readability|structure|meta),
    message: String,
    priority: String (high|medium|low),
    position: Number
  }],
  createdAt: Date
}
```

## Sample Content

Here's an example of how the tool works:

**Initial Content:**
```
Title: "Best Coffee Shops"
Content: "I like coffee. There are many coffee shops. They sell coffee."
```

**SEO Analysis Result:**
- Score: 35/100
- Keywords: ["coffee shops", "best coffee", "café recommendations"]
- Suggestions:
  - Add more descriptive content (readability - high priority)
  - Include specific location information (structure - medium priority)
  - Expand content with details about each coffee shop (content - high priority)

**Improved Content:**
```
Title: "10 Best Coffee Shops in Downtown: A Complete Guide"
Content: "Discover the top 10 coffee shops in downtown that offer exceptional brews, cozy atmospheres, and unique experiences. From artisanal roasters to cozy neighborhood cafés, this guide covers everything you need to know..."
```

**Improved SEO Analysis:**
- Score: 78/100
- Keywords: ["best coffee shops", "downtown cafés", "coffee guide", "artisanal coffee"]
- Score improvement: +43 points

## SEO Improvement Report Features

The improvement report shows:
- Score change (points and percentage)
- Keywords added/removed between revisions
- Latest recommendations
- Visual comparison of scores

## Configuration

### OpenAI API
The application uses GPT-4 by default. You can modify the model in `server/services/openaiService.js`:
```javascript
model: 'gpt-4'  
```

### Port Configuration
- Server: Set `PORT` in `.env` (default: 5000)
- Client: Runs on port 3000 by default (React default)

## Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running (if using local instance)
- Check your `MONGODB_URI` in `.env`
- Verify network access for MongoDB Atlas

### OpenAI API Errors
- Verify your API key is correct
- Check your OpenAI account has credits/quota
- Ensure you have access to GPT-4 (or change to GPT-3.5-turbo)

### CORS Issues
- The server includes CORS middleware
- Ensure the client proxy in `package.json` points to the correct server URL

## Future Enhancements

Potential improvements:
- User authentication and multi-user support
- Export reports as PDF
- Integration with more SEO tools
- Content templates
- Bulk analysis
- SEO score history charts
- Content suggestions based on top-performing keywords

## License

MIT License - feel free to use this project for your own purposes.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue in the GitHub repository.

---

**Note**: This tool requires an active OpenAI API key with billing enabled. API usage will incur costs based on OpenAI's pricing.

