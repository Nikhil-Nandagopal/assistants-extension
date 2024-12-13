/**
 * Save URL to chrome storage
 * @param {string} url - URL to save
 */
export async function saveUrl(url) {
  await chrome.storage.local.set({ lastUrl: url });
}

/**
 * Load last used URL from storage
 * @returns {Promise<string>} Last used URL
 */
export async function loadLastUrl() {
  const result = await chrome.storage.local.get(['lastUrl']);
  return result.lastUrl || '';
}