import imgSrc from "./image-gallery.js";

const galleryBox = document.querySelector('.js-gallery');
const createItems = createGalleryItem(imgSrc);

galleryBox.insertAdjacentHTML('beforeend', createItems);
galleryBox.addEventListener('click', onGalleryClick);

function createGalleryItem(imgSrc) {
  return imgSrc
  .map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${original}"
          data-source="${preview}"
          alt="${description}"
        />
      </a>
    </li>
    `;
    })
  .join('');
};

function onGalleryClick(event) {
  event.preventDefault()

  if(event.target.nodeName !== "IMG") return;
}