# 🔧 Reddit API Fix Guide - "Invalid Grant" Error

## Current Issue
You're getting an "Invalid grant" error from Reddit, which means your Reddit API credentials are not working correctly.

## 🔍 Diagnosis Steps

### Step 1: Verify Your Reddit Account
1. Can you log into Reddit with your username and password?
2. Go to https://reddit.com and try logging in with:
   - Username: `FALCON`
   - Password: `Gg982020`

### Step 2: Check Two-Factor Authentication (2FA)
1. Go to https://www.reddit.com/prefs/privacy/
2. Look for "Two-factor authentication"
3. **If enabled**: This is likely causing your issue!

### Step 3: Verify Your Reddit App
1. Go to https://www.reddit.com/prefs/apps
2. Look for your app in the list
3. It should show something like:
   ```
   [Your App Name]
   script application
   developed by FALCON
   ```

## 🛠️ Solutions (Try in Order)

### Solution 1: Disable 2FA (Temporary)
If you have 2FA enabled:
1. Go to https://www.reddit.com/prefs/privacy/
2. Temporarily disable "Two-factor authentication"
3. Test the bot again
4. You can re-enable 2FA after confirming the bot works

### Solution 2: Create a New Reddit App
1. Go to https://www.reddit.com/prefs/apps
2. Click "Create App" or "Create Another App"
3. Fill out the form:
   - **Name**: `FalconVideoBot` (or any name)
   - **App type**: Select "script" ⚠️ **IMPORTANT**
   - **Description**: `AskReddit video generation bot`
   - **About URL**: Leave blank
   - **Redirect URI**: `http://localhost:8080` (required but not used)
4. Click "Create app"
5. Copy the new credentials:
   - **Client ID**: The string under your app name (looks like: `abc123def456`)
   - **Client Secret**: The "secret" field

### Solution 3: Update Your Credentials
Replace your `.env` file content with the new credentials:

```properties
# Reddit API Configuration
userAgent=FalconVideos/1.0.0 by FALCON
clientId=YOUR_NEW_CLIENT_ID_HERE
clientSecret=YOUR_NEW_CLIENT_SECRET_HERE
username=FALCON
password=Gg982020

# Google Cloud Platform Configuration
GOOGLE_APPLICATION_CREDENTIALS=./google-credentials-template.json
```

### Solution 4: Test Different Username Formats
Sometimes Reddit is picky about username format. Try these variations in your `.env`:

**Option A** (current):
```
username=FALCON
```

**Option B** (lowercase):
```
username=falcon
```

**Option C** (with u/ prefix):
```
username=u/FALCON
```

## 🧪 Testing Your Fix

After making changes, run:
```bash
node test-reddit-credentials.js
```

You should see:
```
✅ Successfully connected as: FALCON
✅ Successfully accessed r/AskReddit
✅ Successfully retrieved posts
🎉 All Reddit API tests passed!
```

## 🚨 Common Mistakes

1. **Wrong App Type**: Make sure your Reddit app is "script", not "web app"
2. **Copy/Paste Errors**: Client ID and secret are long strings - make sure no characters are missing
3. **2FA Issues**: Most common cause of "Invalid grant" errors
4. **Case Sensitivity**: Username must match exactly
5. **Expired Passwords**: If you recently changed your Reddit password, update the .env file

## 🆘 Still Not Working?

1. **Create a completely new Reddit account** (for testing)
2. **Use that account to create a new Reddit app**
3. **Test with the new credentials**

This will help isolate whether the issue is with your specific account or the setup process.

## ✅ Next Steps After Fix

Once the Reddit test passes, you can run:
```bash
npm start
```

The bot will show you top AskReddit posts to choose from, and you'll be back to creating videos!

---

💡 **Pro Tip**: Keep your Reddit app credentials secure and don't share them publicly. The .gitignore file already excludes your .env file from version control.
