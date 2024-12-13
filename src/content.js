// Chat Button Component
class ChatButton {
  constructor(onClick, primaryColor) {
    this.button = this.createButton();
    this.button.addEventListener('click', onClick);
    this.setPrimaryColor(primaryColor);
  }

  createButton() {
    const button = document.createElement('div');
    button.className = 'appsmith-chat-button';
    this.setDefaultIcon(button);
    return button;
  }

  setDefaultIcon(button) {
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="chat-icon">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" class="close-icon" style="display: none;">
        <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
      </svg>
    `;
  }

  setPrimaryColor(color) {
    if (color) {
      this.button.style.backgroundColor = color;
    }
  }

  toggleIcon(isOpen) {
    const chatIcon = this.button.querySelector('.chat-icon');
    const closeIcon = this.button.querySelector('.close-icon');

    if (isOpen) {
      chatIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      chatIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  show() {
    document.body.appendChild(this.button);
  }

  remove() {
    this.button.remove();
  }
}

// Chat Widget Component
class ChatWidget {
  constructor(url) {
    this.container = this.createContainer();
    this.iframe = this.createIframe(url);
    this.closeButton = this.createCloseButton();
    this.closeCallback = null;
    this.setupWidget();
  }

  createContainer() {
    const container = document.createElement('div');
    container.className = 'appsmith-chat-widget';
    return container;
  }

  createIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.className = 'appsmith-chat-iframe';
    return iframe;
  }

  createCloseButton() {
    const button = document.createElement('button');
    button.className = 'appsmith-chat-close';
    button.innerHTML = '✕';
    return button;
  }

  setupWidget() {
    this.closeButton.addEventListener('click', () => this.close());
    this.container.appendChild(this.iframe);
    // this.container.appendChild(this.closeButton);
  }

  onClose(callback) {
    this.closeCallback = callback;
  }

  show() {
    document.body.appendChild(this.container);
    setTimeout(() => this.container.classList.add('open'), 50);
  }

  close() {
    this.container.classList.remove('open');
    setTimeout(() => {
      this.container.remove();
      if (this.closeCallback) {
        this.closeCallback();
      }
    }, 300);
  }

  isOpen() {
    return document.body.contains(this.container);
  }
}

function initializeChatWidget() {
  let widget = null;
  let chatButton = null;

  chrome.storage.local.get(['primaryColor', 'appsmithUrl'], (settings) => {
    chatButton = new ChatButton(() => {
      if (!widget) {
        widget = new ChatWidget(settings.appsmithUrl);
        widget.show();
        chatButton.toggleIcon(true);
        widget.onClose(() => {
          widget = null;
          chatButton.toggleIcon(false);
        });
      } else {
        widget.close();
        widget = null;
        chatButton.toggleIcon(false);
      }
    }, settings.primaryColor);
    chatButton.show();
  });
}

// Initialize when the content script loads
initializeChatWidget();
