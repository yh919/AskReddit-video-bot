require("dotenv").config();
const fs = require("fs");

console.log("🤖 AskReddit Video Bot - Setup Checker");
console.log("=====================================\n");

// Check environment variables
console.log("📋 Checking environment variables...");
const requiredEnvVars = [
  "userAgent",
  "clientId",
  "clientSecret",
  "username",
  "password",
];

let envOk = true;
requiredEnvVars.forEach((envVar) => {
  if (process.env[envVar]) {
    console.log(`✅ ${envVar}: configured`);
  } else {
    console.log(`❌ ${envVar}: missing`);
    envOk = false;
  }
});

// Check Google Cloud credentials
console.log("\n☁️ Checking Google Cloud credentials...");
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (fs.existsSync(credentialsPath)) {
    console.log(`✅ Google credentials file found: ${credentialsPath}`);

    try {
      const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));
      if (credentials.type === "service_account" && credentials.project_id) {
        console.log(
          `✅ Valid service account for project: ${credentials.project_id}`
        );
      } else {
        console.log("❌ Invalid credentials file format");
      }
    } catch (error) {
      console.log("❌ Error reading credentials file:", error.message);
    }
  } else {
    console.log(`❌ Google credentials file not found: ${credentialsPath}`);
    console.log(
      "   Please download your service account key from Google Cloud Console"
    );
  }
} else {
  console.log("❌ GOOGLE_APPLICATION_CREDENTIALS not set in .env file");
}

// Check required directories
console.log("\n📁 Checking required directories...");
const requiredDirs = [
  "./resources/templates",
  "./resources/audio",
  "./result",
  "./result/frames",
  "./result/audios",
  "./result/videos-cuts",
  "./result/final-videos",
];

requiredDirs.forEach((dir) => {
  if (fs.existsSync(dir)) {
    console.log(`✅ ${dir}: exists`);
  } else {
    console.log(`⚠️  ${dir}: creating...`);
    try {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`✅ ${dir}: created`);
    } catch (error) {
      console.log(`❌ ${dir}: failed to create - ${error.message}`);
    }
  }
});

// Check template files
console.log("\n📄 Checking template files...");
const templateFiles = [
  "./resources/templates/question.html",
  "./resources/templates/comment.html",
];

templateFiles.forEach((file) => {
  if (fs.existsSync(file)) {
    console.log(`✅ ${file}: exists`);
  } else {
    console.log(`❌ ${file}: missing`);
  }
});

// Test Google Cloud Text-to-Speech
console.log("\n🗣️ Testing Google Cloud Text-to-Speech...");
if (
  process.env.GOOGLE_APPLICATION_CREDENTIALS &&
  fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
) {
  try {
    const textToSpeech = require("@google-cloud/text-to-speech");
    const client = new textToSpeech.TextToSpeechClient();
    console.log(
      "✅ Google Cloud Text-to-Speech client initialized successfully"
    );
  } catch (error) {
    console.log(
      "❌ Failed to initialize Google Cloud Text-to-Speech:",
      error.message
    );
  }
} else {
  console.log("⚠️  Skipping Google Cloud test - credentials not configured");
}

console.log("\n🚀 Setup Status Summary:");
if (
  envOk &&
  process.env.GOOGLE_APPLICATION_CREDENTIALS &&
  fs.existsSync(process.env.GOOGLE_APPLICATION_CREDENTIALS)
) {
  console.log("✅ Setup appears to be complete! You can run: npm start");
} else {
  console.log(
    "⚠️  Setup incomplete. Please check the issues above and refer to setup-guide.md"
  );
}

console.log("\n📖 For detailed setup instructions, see: setup-guide.md");
