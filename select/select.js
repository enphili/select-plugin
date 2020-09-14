'use strict';

const getTemplate = (data = [], placeholder, selectedId) => {
  let text = placeholder ?? 'Текст заданный по умолчанию';
  const arr = data.map(obj => {
    let cls = '';
    if (obj.id === selectedId) {
      text = obj.value;
      cls = 'selected';
    }
    return `
      <li class="select__item ${cls}" data-type="item" data-id="${obj.id}">${obj.value}</li>
    `;
  });
  return `
        <div class="select__backdrop" data-type="backdrop"></div>
        <div class="select__input" data-type="input">
          <span data-type="value">${text}</span>
          <i class="fa fa-chevron-down" data-type="arrow"></i>
        </div>
        <div class="select__dropdown">
          <ul class="select__list">
          ${arr.join('')}
          </ul>
        </div>
  `;
};

export class Select {

  constructor(selector, options) {
    this.$elem = document.querySelector(selector);
    this.options = options;
    this.selectedId = options.selectedId;

    this.#render();
    this.#setup();
  }

  #render() { // приватный метод рендеринга самого селекта
    const {placeholder, data} = this.options;
    this.$elem.classList.add('select');
    this.$elem.insertAdjacentHTML('afterbegin', getTemplate(data, placeholder, this.selectedId));
  }

  #setup() {
    this.clickHandler = this.clickHandler.bind(this);
    this.$elem.addEventListener('click', this.clickHandler);
    this.$arrow = this.$elem.querySelector('[data-type="arrow"]');
    this.$value = this.$elem.querySelector('[data-type="value"]');
  }

  clickHandler(event) {
    const {type} = event.target.dataset;
    if (type === 'input' || type === 'arrow' || type === 'value') {
      this.toogleSelect();
    } else if (type === 'item') {
      const id = event.target.dataset.id;
      this.select(id);
    } else if (type === 'backdrop') {
      this.close();
    }
  }

  get isOpen() {
    return this.$elem.classList.contains('open');
  }

  get current() {
    return this.options.data.find(item => item.id === this.selectedId);
  }

  select(id) {
    this.selectedId = id;
    this.$value.textContent = this.current.value;
    this.$elem.querySelectorAll('[data-type="item"]').forEach(element => {
      element.classList.remove('selected');
    });
    this.$elem.querySelector(`[data-id="${id}"]`).classList.add('selected');
    this.options.onSelect ? this.options.onSelect(this.current) : null;
    this.close();
  }


  toogleSelect() {
    this.isOpen ? this.close() : this.open();
  }

  open() {
    this.$elem.classList.add('open');
    this.$arrow.classList.remove('fa-chevron-down');
    this.$arrow.classList.add('fa-chevron-up');
  }

  close() {
    this.$elem.classList.remove('open');
    this.$arrow.classList.remove('fa-chevron-up');
    this.$arrow.classList.add('fa-chevron-down');
  }

  destroy() {
    this.$elem.removeEventListener('click', this.clickHandler);
    this.$elem.innerHTML = '';
  }

}