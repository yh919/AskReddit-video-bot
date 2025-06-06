# 🔧 AskReddit Video Bot - Troubleshooting Guide

## Common Issues and Solutions

### 🔴 "Google Application Default Credentials not found"

**Problem**: The bot can't find your Google Cloud credentials.

**Solutions**:

1. Make sure you have `google-credentials.json` in the project root
2. Check that your `.env` file has: `GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json`
3. Verify the JSON file is valid (not corrupted or empty)
4. Run `npm run setup-check` to verify configuration

### 🔴 "Reddit API Authentication Failed"

**Problem**: Reddit credentials are incorrect or expired.

**Solutions**:

1. Verify your Reddit app is set to "script" type
2. Check username/password are correct in `.env`
3. Make sure your Reddit app `clientId` and `clientSecret` are correct
4. Try creating a new Reddit app if the old one isn't working

### 🔴 "FFmpeg not found" or video processing errors

**Problem**: FFmpeg isn't properly installed or accessible.

**Solutions**:

1. The project should auto-install FFmpeg via `@ffmpeg-installer/ffmpeg`
2. Try deleting `node_modules` and running `npm install` again
3. On Windows, you might need to install Visual C++ Redistributable
4. Check if antivirus is blocking FFmpeg execution

### 🔴 "Permission denied" or file access errors

**Problem**: The bot can't write to directories.

**Solutions**:

1. Run the terminal as administrator (Windows)
2. Check that the `result` folder exists and is writable
3. Make sure no antivirus is blocking file creation
4. Try running from a different location (not in Program Files)

### 🔴 "Module not found" errors

**Problem**: Dependencies aren't properly installed.

**Solutions**:

1. Delete `node_modules` folder and `package-lock.json`
2. Run `npm install` again
3. Make sure you're using Node.js 12.21.0 or higher: `node --version`
4. Try `npm cache clean --force` then `npm install`

### 🔴 Bot gets stuck on "Selecting thread"

**Problem**: Reddit API rate limiting or network issues.

**Solutions**:

1. Wait a few minutes and try again
2. Check your internet connection
3. Verify Reddit credentials are still valid
4. Try selecting a different thread

### 🔴 "Error: Request failed with status code 429"

**Problem**: API rate limiting.

**Solutions**:

1. Wait 10-15 minutes before trying again
2. Reddit has rate limits for API calls
3. Google Cloud also has quotas - check your usage
4. Consider using a different Reddit account for testing

### 🔴 Audio generation fails or sounds weird

**Problem**: Google Cloud Text-to-Speech issues.

**Solutions**:

1. Check your Google Cloud quota and billing
2. Verify Text-to-Speech API is enabled
3. Try a different voice model in `robots/audio.js`
4. Check if the service account has proper permissions

### ⚠️ Warning: High Google Cloud costs

**Problem**: Unexpected billing from Google Cloud.

**Solutions**:

1. Check your Google Cloud billing dashboard
2. Set up billing alerts
3. Consider the character count of posts you're processing
4. First 1 million characters per month are free

## Performance Tips

### 🚀 Speed up processing

- Choose shorter Reddit posts (fewer comments)
- Reduce the character limit in `robots/text.js`
- Use faster voice models in `robots/audio.js`

### 💾 Save space

- Delete old projects from `result/` folder
- Compress or archive completed videos
- The intermediate files (frames, audio cuts) can be deleted after final video creation

### 🎥 Better video quality

- Modify frame templates in `resources/templates/`
- Adjust video settings in `robots/videos.js`
- Use higher quality background audio

## Getting Help

### 📊 Check your setup

```bash
npm run setup-check    # Verify configuration
npm run setup          # Get guided help
```

### 📁 Important files to check

- `.env` - Your API credentials
- `google-credentials.json` - Google Cloud service account
- `result/` - Generated content and videos
- `content.json` - Current processing state (created during run)

### 🌐 Useful links

- [Reddit API Documentation](https://www.reddit.com/dev/api/)
- [Google Cloud Text-to-Speech](https://cloud.google.com/text-to-speech/docs)
- [Node.js Download](https://nodejs.org/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)

### 📧 Still need help?

1. Check the GitHub issues for similar problems
2. Make sure you're using the latest version
3. Include error messages and logs when asking for help
4. Run `npm run setup-check` and include the output

---

💡 **Pro tip**: Always test with a short Reddit post first to make sure everything works before processing longer content!
