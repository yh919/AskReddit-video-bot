@echo off
echo 🚀 AskReddit Video Bot - Quick Google Cloud Setup
echo ================================================
echo.

echo This script will help you set up Google Cloud Text-to-Speech API
echo.

echo 📋 What you need:
echo    1. A Google Cloud account
echo    2. A project with Text-to-Speech API enabled
echo    3. A service account JSON key file
echo.

echo 🌐 Opening Google Cloud Console...
start https://console.cloud.google.com/

echo.
echo 📖 Follow these steps:
echo    1. Create or select a project
echo    2. Enable the Text-to-Speech API
echo    3. Go to IAM ^& Admin ^> Service Accounts
echo    4. Create a new service account
echo    5. Generate and download a JSON key
echo    6. Save the file as 'google-credentials.json' in this folder
echo.

pause
echo.

if exist google-credentials.json (
    echo ✅ Found google-credentials.json file!
    echo Updating .env file...
    
    rem Update the .env file
    powershell -Command "(gc .env) -replace 'GOOGLE_APPLICATION_CREDENTIALS=.*', 'GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json' | Out-File -encoding ASCII .env"
    
    echo ✅ Configuration updated!
    echo.
    echo 🎬 You can now run: npm start
) else (
    echo ❌ google-credentials.json file not found
    echo Please download your service account key and save it as 'google-credentials.json'
)

echo.
echo 📖 For detailed instructions, see: setup-guide.md
pause
