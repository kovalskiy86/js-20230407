class Tooltip {
  element;
  tooltipText = '';

  constructor() {
    if (Tooltip._instance) {
      return Tooltip._instance;
    }
    Tooltip._instance = this;

    const wrapper = document.createElement('div');
    wrapper.innerHTML = `<div class="tooltip">${this.tooltipText}</div>`;
    this.element = wrapper.firstElementChild;
  }

  initialize () {
    document.body.append(this.element);
    this.initEventListeners();
  }

  render(text) {
    if (this.element)
      this.element.textContent = `${text ?? this.tooltipText}`;
  }

  onPointerOver = event => {
    const tooltip = event.target.dataset.tooltip;
    if (tooltip) {
      this.render(tooltip);
      this.initialize();
      this.element.style.left = `${Math.round(event.clientX + 50)}px`;
      this.element.style.top = `${Math.round(event.clientY + 10)}px`;
    }
  }

  onPointerOut = () => {
    if (this.element) this.remove();
  }

  initEventListeners () {
    document.body.addEventListener('pointerout', this.onPointerOut);
    document.body.addEventListener('pointerover', this.onPointerOver);
  }

  removeEventListeners () {
    document.body.removeEventListener('pointerout', this.onPointerOut);
    document.body.removeEventListener('pointerover', this.onPointerOver);
  }

  remove() {
    if (this.element)
      this.element.remove();
  }

  destroy() {
    this.removeEventListeners();
    this.remove();
  }

}

export default Tooltip;
