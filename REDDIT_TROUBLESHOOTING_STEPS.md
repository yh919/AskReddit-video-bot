# 🔧 Reddit "Invalid Grant" Error - Step-by-Step Fix

## Current Status

❌ **Error**: "Invalid grant" error returned from reddit  
🔍 **Analysis**: Reddit is rejecting your login credentials

## 🚨 Most Likely Solutions (Try in Order)

### **Step 1: Check 2FA (MOST COMMON ISSUE)**

1. 🌐 Open: https://www.reddit.com/prefs/update/
2. 🔍 Look for "two-factor authentication" section
3. ❓ **Is 2FA enabled?**
   - ✅ **If YES**: Disable it temporarily, then test again
   - ✅ **If NO**: Continue to Step 2

### **Step 2: Verify Reddit App Configuration**

1. 🌐 Open: https://www.reddit.com/prefs/apps
2. 🔍 Look for your existing app or create a new one

**If you see an existing app:**

- ✅ App type MUST be "script" (not "web app")
- ✅ Client ID should match: `oEp6J3KBRhIReJRRje-Q8w`
- ✅ Note the client secret

**If you need to create a new app:**

1. Click "Create App" or "Create Another App"
2. Fill out:
   - **Name**: FalconVideos (or any name)
   - **Type**: ✅ **script** (IMPORTANT!)
   - **Description**: Video bot (optional)
   - **About URL**: leave blank
   - **Redirect URI**: http://localhost:8080
3. Click "Create app"
4. Note the new Client ID and Client Secret

### **Step 3: Update .env File (if needed)**

If you created a new app or found different credentials:

```bash
# Update these in your .env file:
clientId=YOUR_NEW_CLIENT_ID
clientSecret=YOUR_NEW_CLIENT_SECRET
username=FALCON
password=YOUR_PASSWORD
userAgent=FalconVideos/1.0.0 by akaFalcon
```

### **Step 4: Test Again**

```bash
npm run test-reddit
```

## 🔍 Current Credentials Being Used

- **Username**: FALCON
- **Client ID**: oEp6J3KBRhIReJRRje-Q8w
- **Client Secret**: CKNAcM-8... (partially hidden)
- **User Agent**: FalconVideos/1.0.0 by akaFalcon

## 🆘 If Still Not Working

### **Option A: Create Completely New App**

1. Go to https://www.reddit.com/prefs/apps
2. Create a new app with a different name
3. Make sure type is "script"
4. Update .env with new credentials

### **Option B: Check Account Status**

- Make sure your Reddit account is not suspended
- Try logging into Reddit normally in a browser
- Make sure your password is correct

### **Option C: Alternative Authentication**

Some users have success with:

1. Using a different Reddit account
2. Creating an app password (if Reddit supports it)
3. Contacting Reddit support

## 📞 Need More Help?

- Run: `npm run test-reddit` to test again
- Check: https://www.redditstatus.com/ for Reddit outages
- Docs: https://www.reddit.com/dev/api/
