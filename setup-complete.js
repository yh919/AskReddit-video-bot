#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const readline = require("readline-sync");

console.log("🎬 AskReddit Video Bot - Final Setup");
console.log("====================================\n");

// Check if we have evidence that the bot has run before
const hasExistingOutput =
  fs.existsSync("./result/final-videos") &&
  fs.readdirSync("./result/final-videos").length > 0;

if (hasExistingOutput) {
  console.log(
    "🎉 Great news! I can see you've already successfully generated videos!"
  );
  const videoFolders = fs.readdirSync("./result/final-videos");
  console.log(`📹 Found ${videoFolders.length} video project(s):`);
  videoFolders.forEach((folder) => {
    const videoPath = `./result/final-videos/${folder}`;
    const videos = fs
      .readdirSync(videoPath)
      .filter((file) => file.endsWith(".mp4"));
    console.log(`   - ${folder}: ${videos.length} video(s)`);
  });
  console.log();
}

// Current status check
console.log("📋 Current Setup Status:");
console.log("========================");

// Check Reddit credentials
const envPath = "./.env";
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  const hasRedditCreds =
    envContent.includes("clientId=") &&
    envContent.includes("clientSecret=") &&
    envContent.includes("username=");
  console.log(
    `✅ Reddit API credentials: ${hasRedditCreds ? "Configured" : "Missing"}`
  );
} else {
  console.log("❌ .env file: Missing");
}

// Check Google Cloud setup
const googleCredsConfigured =
  process.env.GOOGLE_APPLICATION_CREDENTIALS &&
  fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS);
console.log(
  `${googleCredsConfigured ? "✅" : "⚠️ "} Google Cloud credentials: ${
    googleCredsConfigured ? "Configured" : "Needs setup"
  }`
);

// Check dependencies
const nodeModulesExists = fs.existsSync("./node_modules");
console.log(
  `${nodeModulesExists ? "✅" : "❌"} Node.js dependencies: ${
    nodeModulesExists ? "Installed" : "Need installation"
  }`
);

console.log("\n🚀 Next Steps:");
console.log("==============");

if (hasExistingOutput && googleCredsConfigured) {
  console.log("🎉 Your bot is ready to use! Run: npm start");
  console.log("\n💡 Tips:");
  console.log("   - The bot will show you top AskReddit posts to choose from");
  console.log("   - Processing takes 5-15 minutes depending on post length");
  console.log("   - Final videos are saved in result/final-videos/");
  console.log(
    '   - Use the file ending with "-background-video.mp4" for best quality'
  );
} else if (!googleCredsConfigured) {
  console.log("⚠️  You need to set up Google Cloud Text-to-Speech API:");
  console.log("   1. Go to: https://console.cloud.google.com/");
  console.log("   2. Create a project and enable Text-to-Speech API");
  console.log("   3. Create a service account and download the JSON key");
  console.log('   4. Save it as "google-credentials.json" in this directory');
  console.log("   5. Update your .env file with:");
  console.log("      GOOGLE_APPLICATION_CREDENTIALS=./google-credentials.json");
  console.log("\n📖 See setup-guide.md for detailed instructions");
} else {
  console.log("✅ Run: npm start");
}

// Offer to open the final video
if (hasExistingOutput) {
  console.log("\n🎬 Would you like to see your generated videos?");
  const showVideos = readline.keyInYN("Open the result folder?");
  if (showVideos) {
    const { exec } = require("child_process");
    const resultPath = path.resolve("./result/final-videos");
    exec(`explorer "${resultPath}"`, (error) => {
      if (error) {
        console.log(`📂 Videos are located at: ${resultPath}`);
      } else {
        console.log("📂 Opening result folder...");
      }
    });
  }
}

console.log("\n🆘 Need help? Check:");
console.log("   - setup-guide.md (detailed setup instructions)");
console.log('   - Run "npm run setup-check" to verify configuration');
console.log("   - Check the README.md for troubleshooting");

console.log("\n🎯 Happy video making! 🎬");
