// Add imports above this line

import { galleryItems } from './gallery-items';
import SimpleLightbox from "simplelightbox";
import SimpleLightbox from "simplelightbox/dist/simple-lightbox.esm";
// Change code below this line

const galleryList = document.querySelector('.gallery');
const galleryItemMarkup = createGalleryMarkup(galleryItems);
galleryList.insertAdjacentHTML("beforeend", galleryItemMarkup);

function createGalleryMarkup(galleryItems) {
  return galleryItems
  .map(({
    preview, original, description}) => { 
      return `
  <li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  }).join("");
}
galleryList.addEventListener('click', onGalleryItemClick);

function onGalleryItemClick(evt) {
  evt.preventDefault();
  
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  
  const instance = basicLightbox.create(`
    <img src="" width="800" height="600">
  `, {
    onShow: (instance) => {
      window.addEventListener('keydown', onEscapeKeyPress);
    },
    onClose: (instance) => {
      window.removeEventListener('keydown', onEscapeKeyPress);
    }
  });
  
  instance.show();
  const lightbox = new SimpleLightbox('.gallery__link', {
    captionDelay: 250,
    captionsData: 'alt',
  });

  const largeImageURL = evt.target.dataset.source;
  instance.element().querySelector('img').src = largeImageURL;

   function onEscapeKeyPress(evt) {
    if (evt.code === 'Escape') {
      instance.close();
     }
  }
}
console.log(galleryItems);
