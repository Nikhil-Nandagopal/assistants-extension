/**
 * Creates and manages the overlay UI components
 */
export class Overlay {
  constructor(url) {
    this.container = this.createContainer();
    this.iframe = this.createIframe(url);
    this.closeButton = this.createCloseButton();
    this.setupOverlay();
  }

  createContainer() {
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      right: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      background: white;
    `;
    return container;
  }

  createIframe(url) {
    const iframe = document.createElement('iframe');
    iframe.src = url;
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
    `;
    return iframe;
  }

  createCloseButton() {
    const button = document.createElement('button');
    button.textContent = '✕';
    button.style.cssText = `
      position: absolute;
      top: 10px;
      right: 10px;
      z-index: 10000;
      padding: 8px 12px;
      background: #ff4444;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    `;
    return button;
  }

  setupOverlay() {
    this.closeButton.addEventListener('click', () => {
      this.container.remove();
    });
    
    this.container.appendChild(this.iframe);
    this.container.appendChild(this.closeButton);
  }

  show() {
    document.body.appendChild(this.container);
  }
}