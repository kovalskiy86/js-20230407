export default class Slider {
  element; // HTMLElement;
  thumb; // HTMLElement;

  position = {
    shiftX: 0,
    sliderLeft: 0,
  };

  onMouseMove = event => {
    const { clientX } = event;
    const { shiftX, sliderLeft } = this.position;

    let newLeft = clientX - shiftX - sliderLeft;

    // курсор вышел из слайдера => оставить бегунок в его границах.
    if (newLeft < 0) {
      newLeft = 0;
    }

    const rightEdge = this.element.offsetWidth - this.thumb.offsetWidth;

    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    this.thumb.style.left = `${newLeft}px`;
  };

  onMouseUp = () => {
    const customEvent = new CustomEvent('position-changed', {
      bubbles: true,
      detail: {
        foo: 1
      }
    });

    this.element.dispatchEvent(customEvent);

    this.removeListeners();
  };

  constructor() {
    this.render();
    this.initEventListeners();
  }

  initEventListeners() {
    const thumb = this.element.querySelector('.thumb');

    thumb.addEventListener('pointerdown', event => {
      event.preventDefault(); // предотвратить запуск выделения (действие браузера)

      this.getInitialPosition(event);

      document.addEventListener('pointermove', this.onMouseMove);
      document.addEventListener('pointerup', this.onMouseUp);
    });
  }

  getInitialPosition (event) {
    this.position.shiftX = event.clientX - this.thumb.getBoundingClientRect().left;
    this.position.sliderLeft = this.element.getBoundingClientRect().left;
  }

  render () {
    const element = document.createElement('div');

    element.innerHTML = `
      <div id="slider" class="slider">
        <div class="thumb"></div>
      </div>
    `;

    this.element = element.firstElementChild;
    this.thumb = this.element.querySelector('.thumb');
  }

  remove () {
    this.element.remove();
  }

  removeListeners () {
    document.removeEventListener('pointerup', this.onMouseUp);
    document.removeEventListener('pointermove', this.onMouseMove);
  }

  destroy() {
    this.remove();
    this.removeListeners();
  }
}
