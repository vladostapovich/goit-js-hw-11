import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api';
import { galleryEl } from './js/render-functions';
import { imageMarkup } from './js/render-functions';

const formEl = document.querySelector('.img-form');
const loaderEl = document.querySelector('.loader');

formEl.addEventListener('submit', formSubmit);

function formSubmit(event) {
  event.preventDefault();

  galleryEl.innerHTML = '';
  loaderEl.classList.remove('hidden');
  const picture = event.target.elements.picture.value.trim();
  fetchImages(picture).then(data => {
    if (data.totalHits === 0 || picture === '') {
      loaderEl.classList.add('hidden');
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: 'white',
        backgroundColor: 'red',
        position: 'topRight',
      });
    } else {
      loaderEl.classList.add('hidden');
      imageMarkup(data);
    }
  });
  event.target.reset();
}
