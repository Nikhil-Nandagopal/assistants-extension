/**
 * Validates if a given URL is a valid Appsmith URL
 * @param {string} url - The URL to validate
 * @returns {boolean} - Whether the URL is valid
 */
export function isValidAppsmithUrl(url) {
  try {
    const urlObj = new URL(url);
    return url.length > 0 && (
      urlObj.hostname.includes('appsmith.com') || 
      urlObj.hostname.includes('appsmith.org') ||
      urlObj.pathname.includes('appsmith')
    );
  } catch {
    return false;
  }
}