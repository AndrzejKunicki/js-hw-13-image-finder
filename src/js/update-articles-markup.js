import imagesCards from '../templating/imagesCards.hbs';
import refs from './refs';

function updateArticlesMarkup(articles) {
  const markup = imagesCards(articles);
  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}

export default updateArticlesMarkup;
