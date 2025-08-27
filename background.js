chrome.runtime.onInstalled.addListener(() => {
  console.log("Profile Matcher Extension installed.");
});

// Listen for messages if needed (can be extended for future features)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "log") {
    console.log("Background received:", message.data);
  }
});
