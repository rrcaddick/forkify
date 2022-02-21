import icons from 'url:../../img/icons.svg';

export default class View {
  _data;

  _clear() {
    this._parentElement.innerHTML = '';
  }
  /**
   * Render the received object to the dom
   * @param {Object | Object[]} data The data to be rendered to the dom, eg recipe
   * @returns {undefined}
   *@this {Object} View instance
   */
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) return this.renderError();
    this._data = data;
    const markup = this._generateMarkup();

    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = [...newDOM.querySelectorAll('*')];
    const curElements = [...this._parentElement.querySelectorAll('*')];

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];

      const nodeHasChanged = !newEl.isEqualNode(curEl);

      if (nodeHasChanged) {
        // Update attributes
        [...newEl.attributes].forEach(newAttr => {
          curEl.setAttribute(newAttr.name, newAttr.value);
        });

        // Update text
        const isTextNode = newEl.firstChild?.nodeValue.trim() !== '';
        if (isTextNode) {
          curEl.textContent = newEl.textContent;
        }
      }
    });
  }

  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div> 
    `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
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
        <div>
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
