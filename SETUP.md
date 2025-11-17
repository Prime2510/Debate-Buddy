# Debate Buddy - Setup Instructions

## Backend Server Setup

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Hugging Face API key

### Installation Steps

1. **Navigate to the server directory:**
   ```powershell
   cd server
   ```

2. **Install dependencies:**
   ```powershell
   npm install
   ```

3. **Configure environment variables:**
   - Copy `.env.example` to `.env`:
     ```powershell
     Copy-Item .env.example .env
     ```
   - Open `.env` and add your Hugging Face API key:
     ```
     HF_API_KEY=your_actual_api_key_here
     ```

4. **Start the server:**
   ```powershell
   npm start
   ```
   
   Or for development (auto-restart on changes):
   ```powershell
   npm run dev
   ```

5. **Verify the server is running:**
   - Open http://localhost:3000/api/health in your browser
   - You should see: `{"status":"ok","message":"Debate Buddy API Server is running"}`

### Frontend Setup

1. **Navigate back to the main project directory:**
   ```powershell
   cd ..
   ```

2. **Open `index.html` in your browser:**
   - You can use Live Server extension in VS Code, or
   - Simply open the file directly in your browser

3. **Test the application:**
   - Enter a debate topic
   - Write an argument (at least 50 characters)
   - Click "Challenge My Argument"
   - The app will send the request to your local server, which will forward it to Hugging Face

## Troubleshooting

### Server won't start
- Make sure port 3000 is not already in use
- Check that Node.js is installed: `node --version`
- Verify all dependencies are installed: `npm install`

### API errors
- Verify your Hugging Face API key is correct in `.env`
- Check that the server is running on http://localhost:3000
- Make sure you have a stable internet connection

### CORS errors
- The server should handle CORS automatically
- If issues persist, make sure the frontend is making requests to `http://localhost:3000/api/analyze`

## Deployment Options

### Option 1: Render (Free)
1. Push your `server` folder to GitHub
2. Create account on [Render](https://render.com)
3. Create new Web Service
4. Connect your GitHub repo
5. Add environment variable `HF_API_KEY`
6. Update frontend config to use your Render URL

### Option 2: Railway (Free tier)
1. Install Railway CLI or use their web interface
2. Deploy from GitHub or local folder
3. Add environment variables
4. Get your deployment URL

### Option 3: Vercel Serverless Function
1. Convert `server.js` to Vercel serverless format
2. Deploy via Vercel CLI or GitHub integration
3. Update frontend config

## Project Structure

```
Debate-Buddy/
├── index.html              # Frontend HTML
├── css/
│   └── styles.css         # Styles
├── js/
│   ├── app.js             # Main frontend logic
│   ├── api.js             # API calls
│   └── config.js          # Configuration
└── server/
    ├── server.js          # Backend proxy server
    ├── package.json       # Dependencies
    ├── .env               # Environment variables (create this)
    └── .env.example       # Example env file
```

## Getting Hugging Face API Key

1. Go to https://huggingface.co/
2. Sign up or log in
3. Click your profile picture → Settings
4. Click "Access Tokens" in the left sidebar
5. Click "New token"
6. Name it "Debate Buddy"
7. Select "Read" access
8. Click "Generate token"
9. Copy the token (starts with `hf_`)
10. Paste it in your `.env` file

## Notes

- The free tier of Hugging Face has rate limits
- First request may be slow as the model loads
- For production, consider using a paid API or deploying your own model
- Keep your API key secret - never commit `.env` to git
