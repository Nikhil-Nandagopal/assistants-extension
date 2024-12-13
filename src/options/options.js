import { loadSettings, saveSettings, DEFAULT_SETTINGS } from '../utils/settings.js';

class OptionsUI {
  constructor() {
    this.primaryColorInput = document.getElementById('primaryColor');
    this.primaryColorText = document.getElementById('primaryColorText');
    this.appsmithUrlInput = document.getElementById('appsmithUrl');
    this.saveButton = document.getElementById('save');
    this.resetButton = document.getElementById('reset');
    this.status = document.getElementById('status');
    
    this.initialize();
  }

  async initialize() {
    // Load current settings
    const settings = await loadSettings();
    
    // Initialize form values
    this.primaryColorInput.value = settings.primaryColor;
    this.primaryColorText.value = settings.primaryColor;
    this.appsmithUrlInput.value = settings.appsmithUrl;
    
    // Setup event listeners
    this.primaryColorInput.addEventListener('input', (e) => {
      this.primaryColorText.value = e.target.value;
      document.documentElement.style.setProperty('--primary-color', e.target.value);
    });
    
    this.primaryColorText.addEventListener('input', (e) => {
      if (/^#[0-9A-F]{6}$/i.test(e.target.value)) {
        this.primaryColorInput.value = e.target.value;
        document.documentElement.style.setProperty('--primary-color', e.target.value);
      }
    });
    
    this.saveButton.addEventListener('click', () => this.handleSave());
    this.resetButton.addEventListener('click', () => this.handleReset());
    
    // Set initial primary color CSS variable
    document.documentElement.style.setProperty('--primary-color', settings.primaryColor);
  }

  async handleSave() {
    try {
      const settings = {
        primaryColor: this.primaryColorInput.value,
        appsmithUrl: this.appsmithUrlInput.value
      };
      
      await saveSettings(settings);
      this.showStatus('Settings saved successfully!', 'success');
      
      // Notify content script of settings change
      const tabs = await chrome.tabs.query({});
      tabs.forEach(tab => {
        chrome.tabs.sendMessage(tab.id, {
          type: 'SETTINGS_UPDATED',
          settings
        }).catch(() => {
          // Ignore errors for inactive tabs
        });
      });
    } catch (error) {
      this.showStatus('Failed to save settings', 'error');
    }
  }

  async handleReset() {
    try {
      await saveSettings(DEFAULT_SETTINGS);
      
      // Reset form values
      this.primaryColorInput.value = DEFAULT_SETTINGS.primaryColor;
      this.primaryColorText.value = DEFAULT_SETTINGS.primaryColor;
      this.appsmithUrlInput.value = DEFAULT_SETTINGS.appsmithUrl;
      
      // Reset primary color CSS variable
      document.documentElement.style.setProperty('--primary-color', DEFAULT_SETTINGS.primaryColor);
      
      this.showStatus('Settings reset to defaults', 'success');
    } catch (error) {
      this.showStatus('Failed to reset settings', 'error');
    }
  }

  showStatus(message, type = 'success') {
    this.status.textContent = message;
    this.status.className = `status ${type}`;
    setTimeout(() => {
      this.status.textContent = '';
      this.status.className = 'status';
    }, 3000);
  }
}

// Initialize options UI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new OptionsUI();
});