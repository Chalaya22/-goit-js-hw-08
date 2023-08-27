// Add imports above this line
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItems } from './gallery-items';

const galleryContainer = document.querySelector('.gallery');
console.log(galleryContainer);

function renderListGalary(galleryItems) {
  return galleryItems
    .map(
      ({ preview, original, description }) =>
        `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            data-source="${original}"
            src="${preview}"
            alt="${description}"
            />
        </a>
    </li>`
    )
    .join('');
}

galleryContainer.insertAdjacentHTML(
  'beforeend',
  renderListGalary(galleryItems)
);

new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 300,
});

console.log(galleryItems);
