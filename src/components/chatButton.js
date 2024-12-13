export class ChatButton {
  constructor(onClick) {
    this.button = this.createButton();
    this.button.addEventListener('click', onClick);
  }

  createButton() {
    const button = document.createElement('div');
    button.className = 'appsmith-chat-button';
    button.innerHTML = `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
      </svg>
    `;
    return button;
  }

  show() {
    document.body.appendChild(this.button);
  }

  remove() {
    this.button.remove();
  }
}