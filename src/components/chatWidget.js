export class ChatWidget {
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
    this.closeButton.addEventListener('click', () => {
      this.container.classList.remove('open');
      setTimeout(() => {
        this.container.remove();
        if (this.closeCallback) {
          this.closeCallback();
        }
      }, 300);
    });
    
    this.container.appendChild(this.iframe);
    this.container.appendChild(this.closeButton);
  }

  onClose(callback) {
    this.closeCallback = callback;
  }

  show() {
    document.body.appendChild(this.container);
    // Trigger animation after append
    setTimeout(() => this.container.classList.add('open'), 50);
  }
}