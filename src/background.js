// Handle extension installation
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // Open options page when extension is installed
    chrome.runtime.openOptionsPage();
  }
});
