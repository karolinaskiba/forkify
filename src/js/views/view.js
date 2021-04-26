import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  render(data, render = true) {
    this._data = data;
    const markup = this._generateMarkup();
    if (!render) {
      return markup;
    }
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();
    const newDom = document.createRange().createContextualFragment(newMarkup);
    const newEelement = Array.from(newDom.querySelectorAll('*'));
    const curElement = Array.from(this._parentElement.querySelectorAll('*'));

    newEelement.forEach((newEl, i) => {
      const curEl = curElement[i];
      if (
        !newEl.isEqualNode(curEl) &&
        newEl?.firstChild.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }
      if (!newEl.isEqualNode(curEl)) {
        Array.from(newEl.attributes).forEach(atrr =>
          curEl.setAttribute(atrr.name, atrr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const spinner = `
              <div class="spinner">
              <svg>
                <use href="${icons}#icon-loader"></use>
              </svg>
              </div> `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', spinner);
  }

  renderError(message = this._errorMessage) {
    const markup = `
              <div>
                <svg>
                  <use href="${icons}#icon-alert-triangle"></use>
                </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderMessage(message = this._message) {
    const markup = `
              <div class="message">
                <svg>
                  <use href="${icons}#icon-smile"></use>
                </svg>
                </div>
                <p>${message}</p>
              </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
