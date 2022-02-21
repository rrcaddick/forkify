import View from './View.js';
import icons from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(rec) {
    const id = window.location.hash.slice(1);
    const active = rec.id === id ? 'preview__link--active' : '';

    return `
        <li class="preview">
          <a class="preview__link ${active}" href="#${rec.id}">
            <figure class="preview__fig">
              <img src="${rec.image}" alt="${rec.title}" />
            </figure>
            <div class="preview__data">
              <h4 class="preview__title">${rec.title.slice(0, 24)}...</h4>
              <p class="preview__publisher">${rec.publisher}</p>
              <div class="preview__user-generated ${rec.key ? '' : 'hidden'}">
                <svg>
                  <use href="${icons}#icon-user"></use>
                </svg>
              </div>
            </div>
            
          </a>
        </li>
    `;
  }
}
