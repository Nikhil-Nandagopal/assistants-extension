/**
 * Settings management utilities
 */

export const DEFAULT_SETTINGS = {
  primaryColor: '#E15615',
  appsmithUrl: 'https://internal.appsmith.com/app/ai-assistants-demo/support-bot-675738d103bc2614401bd66e?embed=true'
};

/**
 * Load all settings from storage
 * @returns {Promise<Object>} Settings object
 */
export async function loadSettings() {
  try {
    const result = await chrome.storage.local.get(['primaryColor', 'appsmithUrl']);
    return { ...DEFAULT_SETTINGS, ...result };
  } catch (error) {
    console.error('Failed to load settings:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * Save settings to storage
 * @param {Object} settings - Settings to save
 * @returns {Promise<void>}
 */
export async function saveSettings(settings) {
  try {
    await chrome.storage.local.set(settings);
  } catch (error) {
    console.error('Failed to save settings:', error);
    throw error;
  }
}