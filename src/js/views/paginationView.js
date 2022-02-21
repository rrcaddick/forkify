import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton('next', curPage + 1);
    }

    // Last page
    if (curPage === numPages && numPages > 1) {
      return this._generateMarkupButton('previous', curPage - 1);
    }

    // Other pages
    if (curPage < numPages) {
      return `
        ${this._generateMarkupButton('previous', curPage - 1)}
        ${this._generateMarkupButton('next', curPage + 1)}
      `;
    }

    // Page 1, and no other pages
    return '';
  }

  _generateMarkupButton(direction, page) {
    return direction === 'next'
      ? `
    <button data-goto="${page}" class="btn--inline pagination__btn--next">
      <span>Page ${page}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `
      : `
    <button data-goto="${page}" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${page}</span>
    </button>
    `;
  }

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      handler(+btn.dataset.goto);
    });
  }
}

export default new PaginationView();
