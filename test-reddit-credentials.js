require("dotenv").config();
const snoowrap = require("snoowrap");

console.log("🔍 Reddit API Credential Tester");
console.log("================================\n");

// Check environment variables
console.log("📋 Checking Reddit credentials...");
const credentials = {
  userAgent: process.env.userAgent,
  clientId: process.env.clientId,
  clientSecret: process.env.clientSecret,
  username: process.env.reddit_username,
  password: process.env.password,
};

// Validate all required credentials are present
const missingCredentials = [];
if (!credentials.userAgent) missingCredentials.push("userAgent");
if (!credentials.clientId) missingCredentials.push("clientId");
if (!credentials.clientSecret) missingCredentials.push("clientSecret");
if (!credentials.username) missingCredentials.push("reddit_username");
if (!credentials.password) missingCredentials.push("password");

if (missingCredentials.length > 0) {
  console.log("❌ Missing required credentials:");
  missingCredentials.forEach((cred) => console.log(`   • ${cred}`));
  console.log(
    "\n💡 Please check your .env file and ensure all credentials are set."
  );
  process.exit(1);
}

// Display (partially masked) credentials
console.log("✅ All credentials found in .env file:");
console.log(`User Agent: ${credentials.userAgent}`);
console.log(`Client ID: ${credentials.clientId}`);
console.log(
  `Client Secret: ${
    credentials.clientSecret
      ? credentials.clientSecret.substring(0, 8) + "..."
      : "NOT SET"
  }`
);
console.log(`Username: ${credentials.username}`);
console.log(
  `Password: ${
    credentials.password ? "***" + credentials.password.slice(-2) : "NOT SET"
  }`
);
console.log();

// Test Reddit API connection
console.log("🔗 Testing Reddit API connection...");

async function testRedditConnection() {
  try {
    console.log("Creating Reddit API client...");
    const reddit = new snoowrap(credentials);

    console.log("Testing basic API call...");
    const me = await reddit.getMe();
    console.log(`✅ Successfully connected as: ${me.name}`);

    console.log("Testing subreddit access...");
    const askReddit = await reddit.getSubreddit("AskReddit");
    console.log("✅ Successfully accessed r/AskReddit");

    console.log("Testing post retrieval...");
    const posts = await askReddit.getTop({ time: "week", limit: 1 });
    if (posts && posts.length > 0) {
      console.log(
        `✅ Successfully retrieved posts. Example: "${posts[0].title.substring(
          0,
          50
        )}..."`
      );
      console.log(
        "\n🎉 All Reddit API tests passed! Your credentials are working correctly."
      );
      return true;
    } else {
      console.log("⚠️ No posts retrieved, but connection seems successful.");
      return true;
    }
  } catch (error) {
    console.log("\n❌ Reddit API Error:");
    console.log("====================");
    console.log(`Error Type: ${error.name}`);
    console.log(`Error Message: ${error.message}`);

    // Enhanced error logging
    if (error.response) {
      console.log(`\n🔍 HTTP Response Details:`);
      console.log(`Status: ${error.response.status}`);
      console.log(`Status Text: ${error.response.statusText}`);
      if (error.response.data) {
        console.log(
          `Response Data:`,
          JSON.stringify(error.response.data, null, 2)
        );
      }
    }

    if (error.request) {
      console.log(`\n🔍 Request Details:`);
      console.log(`URL: ${error.request.url || "N/A"}`);
      console.log(`Method: ${error.request.method || "N/A"}`);
    }

    // Stack trace for debugging
    console.log(`\n🔍 Stack Trace:`);
    console.log(error.stack); // Specific error handling
    const errorMsg = error.message.toLowerCase();
    const responseData = error.response?.data || {};

    if (
      errorMsg.includes("invalid grant") ||
      responseData.error === "invalid_grant"
    ) {
      console.log('\n🔧 DETAILED "Invalid Grant" Analysis:');
      console.log("===================================");
      console.log(
        "This error typically means Reddit rejected your login credentials."
      );
      console.log("\n🔍 Most Common Causes:");
      console.log(
        "1. ❌ 2FA (Two-Factor Authentication) is enabled on your Reddit account"
      );
      console.log("2. ❌ Incorrect username or password");
      console.log(
        "3. ❌ Reddit app is configured as 'web app' instead of 'script'"
      );
      console.log("4. ❌ Wrong client ID or client secret");
      console.log("5. ❌ Account locked or suspended");

      console.log("\n🔧 Step-by-Step Solutions:");
      console.log(
        "1. 🔐 Check 2FA: Go to https://www.reddit.com/prefs/update/"
      );
      console.log(
        "   • If 2FA is ON, you need to disable it for script apps to work"
      );
      console.log("   • Or use an app password if Reddit supports it");

      console.log("\n2. 📱 Verify Reddit App Configuration:");
      console.log("   • Go to: https://www.reddit.com/prefs/apps");
      console.log("   • Find your app and verify:");
      console.log("     - App type MUST be 'script' (not 'web app')");
      console.log("     - Client ID is the string under the app name");
      console.log("     - Client Secret is the 'secret' field");

      console.log("\n3. 🔑 Double-check credentials:");
      console.log(`   • Username: '${credentials.username}' (case-sensitive!)`);
      console.log("   • Password: [HIDDEN] (check for typos)");
      console.log(`   • Client ID: '${credentials.clientId}'`);
      console.log(
        `   • Client Secret: '${credentials.clientSecret?.substring(0, 8)}...'`
      );

      console.log("\n4. 🆕 Create New App (if needed):");
      console.log("   • Go to: https://www.reddit.com/prefs/apps");
      console.log("   • Click 'Create App' or 'Create Another App'");
      console.log("   • Choose 'script' type");
      console.log("   • Use http://localhost:8080 as redirect URI");
    } else if (errorMsg.includes("401") || error.response?.status === 401) {
      console.log("\n🔧 401 Unauthorized - Authentication Failed");
      console.log("• Check username and password");
      console.log("• Verify client ID and secret");
    } else if (errorMsg.includes("403") || error.response?.status === 403) {
      console.log("\n🔧 403 Forbidden - Access Denied");
      console.log("• Your app might not have the right permissions");
      console.log("• Check if your Reddit account is in good standing");
    } else if (errorMsg.includes("timeout") || errorMsg.includes("network")) {
      console.log("\n🔧 Network Error");
      console.log("• Check your internet connection");
      console.log("• Reddit servers might be down");
    } else {
      console.log("\n🔧 Unexpected Error");
      console.log("• Check Reddit status: https://www.redditstatus.com/");
      console.log("• Try again in a few minutes");
    }

    console.log("\n📞 Need Help?");
    console.log("• Check the reddit-fix-guide.md file for more solutions");
    console.log("• Reddit API docs: https://www.reddit.com/dev/api/");
    console.log("• snoowrap docs: https://not-an-aardvark.github.io/snoowrap/");

    return false;
  }
}

testRedditConnection()
  .then((success) => {
    if (success) {
      console.log("\n✅ Test completed successfully!");
      process.exit(0);
    } else {
      console.log("\n❌ Test failed - please review the errors above.");
      process.exit(1);
    }
  })
  .catch((error) => {
    console.log("\n💥 Unexpected error running test:");
    console.error(error);
    process.exit(1);
  });
