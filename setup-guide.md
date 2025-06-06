# AskReddit Video Bot Setup Guide

## Prerequisites

- Node.js 12.21.0 or higher
- Git
- Google Cloud Platform account

## 1. Reddit API Setup (✅ Already Done)

Your Reddit API credentials are already configured in `.env`:

- userAgent: FalconVideos/1.0.0 by akaFalcon
- clientId: oEp6J3KBRhIReJRRje-Q8w
- clientSecret: CKNAcM-8PtsNn7lfa-aoNA-6PnAJ3Q
- username: akaFalcon
- password: Gg982020

## 2. Google Cloud Platform Text-to-Speech API Setup

### Step 1: Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" → "New Project"
3. Name your project (e.g., "askreddit-video-bot")
4. Click "Create"

### Step 2: Enable Text-to-Speech API

1. In the Google Cloud Console, go to the [Text-to-Speech API page](https://console.cloud.google.com/flows/enableapi?apiid=texttospeech.googleapis.com)
2. Make sure your project is selected
3. Click "Enable"

### Step 3: Enable Billing

1. Go to [Billing](https://console.cloud.google.com/billing)
2. Link a billing account to your project
3. Note: Google Cloud offers $300 in free credits for new users

### Step 4: Create Service Account

1. Go to [IAM & Admin > Service Accounts](https://console.cloud.google.com/iam-admin/serviceaccounts)
2. Click "Create Service Account"
3. Name: "askreddit-bot-service"
4. Description: "Service account for AskReddit video bot"
5. Click "Create and Continue"
6. Role: Select "Basic > Editor" or "Cloud Text-to-Speech API > Cloud Text-to-Speech API User"
7. Click "Continue" → "Done"

### Step 5: Download Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create"
6. Save the downloaded JSON file as `google-credentials.json` in your project root directory

### Step 6: Update Environment Variables

1. Update the `.env` file:

```
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json
```

## 3. Install Dependencies

Run the following commands in the project directory:

```bash
npm install
```

## 4. Test the Setup

Run the bot to test everything is working:

```bash
npm start
```

## Troubleshooting

### Common Issues:

1. **Google Cloud Authentication Error**

   - Make sure the `google-credentials.json` file exists
   - Check that the path in `GOOGLE_APPLICATION_CREDENTIALS` is correct
   - Verify that Text-to-Speech API is enabled

2. **Reddit API Error**

   - Verify your Reddit credentials are correct
   - Make sure your Reddit app is configured as "script" type
   - Check that your username/password are correct

3. **FFmpeg Issues**

   - The project uses `@ffmpeg-installer/ffmpeg` which should handle FFmpeg automatically
   - If you encounter issues, you might need to install FFmpeg manually

4. **Node Version Issues**
   - Make sure you're using Node.js 12.21.0 or higher
   - Consider using `nvm` to manage Node.js versions

## File Structure After Setup

```
AskReddit-video-bot/
├── .env (with your credentials)
├── google-credentials.json (your GCP service account key)
├── package.json
├── index.js
├── robots/
│   ├── reddit.js
│   ├── text.js
│   ├── frames.js
│   ├── audio.js
│   └── videos.js
└── resources/
    ├── templates/
    └── audio/
```

## Usage

1. Run `npm start`
2. Select a Reddit thread from the menu
3. Wait for the bot to process (this can take several minutes)
4. Find your generated video in the `result/final-videos/` folder

## Cost Considerations

- Google Cloud Text-to-Speech API charges per character
- First 1 million characters per month are free
- After that, it's $16 per 1 million characters
- A typical AskReddit video uses about 5,000-15,000 characters

## Security Notes

- Never commit `google-credentials.json` to version control
- Keep your `.env` file secure and don't share it publicly
- The `.gitignore` file already excludes these sensitive files
