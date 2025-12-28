# Quick Setup Guide

## Prerequisites Check

Before starting, ensure you have:
- ✅ Node.js (v14+) installed
- ✅ MongoDB installed and running (or MongoDB Atlas account)
- ✅ OpenAI API key

## Installation Steps

1. **Install all dependencies**
   ```bash
   # Install root dependencies (concurrently for running both servers)
   npm install
   
   # Install server dependencies
   cd server
   npm install
   
   # Install client dependencies
   cd ../client
   npm install
   cd ..
   ```

2. **Configure environment variables**
   
   Create a `.env` file in the `server` directory:
   ```bash
   cd server
   cp .env.example .env
   ```
   
   Edit `.env` and add your OpenAI API key:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/seo-tool
   OPENAI_API_KEY=sk-your-actual-api-key-here
   ```

3. **Start MongoDB** (if using local MongoDB)
   
   **macOS:**
   ```bash
   brew services start mongodb-community
   ```
   
   **Linux:**
   ```bash
   sudo systemctl start mongod
   ```
   
   **Windows:**
   ```bash
   net start MongoDB
   ```

4. **Start the application**
   
   From the root directory:
   ```bash
   npm run dev
   ```
   
   This will start both the server (port 5000) and client (port 3000).

5. **Access the application**
   
   Open your browser and navigate to:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api/health

## Testing the Application

1. Create a new draft with sample content
2. Click "Analyze SEO" to get AI-powered recommendations
3. Edit your content based on suggestions
4. Re-analyze to see score improvements
5. Check the revision history and comparison report

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running: `mongosh` or `mongo`
- Check MONGODB_URI in `.env` file
- For MongoDB Atlas, ensure your IP is whitelisted

### OpenAI API Error
- Verify your API key is correct
- Check you have credits/quota available
- Ensure you have access to GPT-4 (or change to GPT-3.5-turbo in `server/services/openaiService.js`)

### Port Already in Use
- Change PORT in server `.env` file
- Or kill the process using the port:
  ```bash
  # Find process
  lsof -ti:5000  # or 3000
  # Kill process
  kill -9 <PID>
  ```

## Next Steps

- Read the full README.md for detailed documentation
- Check SAMPLE_CONTENT.md for example content
- Review SEO_IMPROVEMENT_REPORT.md for sample reports

