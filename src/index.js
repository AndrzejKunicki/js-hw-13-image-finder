import './styles.css';
import { Spinner } from 'spin.js';
import '../node_modules/spin.js/spin.css';
import imagesService from './js/images-servise';
import updateArticlesMarkup from './js/update-articles-markup';
import refs from './js/refs';

import * as basicLightbox from 'basiclightbox';

const debounce = require('lodash.debounce');
const spinner = new Spinner({
  lines: 8, // The number of lines to draw
  length: 18, // The length of each line
  width: 17, // The line thickness
  radius: 25, // The radius of the inner circle
  scale: 1, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 1, // Rounds per second
  rotate: 0, // The rotation offset
  animation: 'spinner-line-fade-quick', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#55abec', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '100%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
}).spin(refs.spinnerRef);

let pixelValue = 1000;

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();

  imagesService.query = refs.inputRef.value;

  refs.galleryRef.innerHTML = ' ';
  imagesService.resetPage();

  refs.loadMoreBtn.classList.add('is-hidden');
  refs.spinnerRef.classList.remove('is-hidden');

  imagesService
    .fetchImages()
    .then(renderServise)
    .catch(error => console.log(error))
    .finally(() => {
      refs.spinnerRef.classList.add('is-hidden');
    });

  refs.searchForm.reset();
  pixelValue = 1000;
});

refs.loadMoreBtn.addEventListener('click', () => {
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.spinnerRef.classList.remove('is-hidden');
  imagesService
    .fetchImages()
    .then(data => {
      renderServise(data);
      window.scrollTo({
        top: pixelValue, // document.documentElement.scrollHeight
        behavior: 'smooth',
      });
      pixelValue += 1000;
    })
    .catch(error => console.log(error))
    .finally(() => {
      refs.spinnerRef.classList.add('is-hidden');
    });
});

function renderServise(data) {
  updateArticlesMarkup(data);
  refs.loadMoreBtn.classList.remove('is-hidden');

  if (data.length < 12) {
    refs.loadMoreBtn.classList.add('is-hidden');
  }
}

refs.galleryRef.addEventListener('click', modalIsOpen);

function modalIsOpen(event) {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const imgOrig = event.target.dataset.source;
  const instance = basicLightbox.create(`
      <div class="modal">
      <img src="${imgOrig}" height="680px"></img>
      </div>
  `);
  instance.show();
}
