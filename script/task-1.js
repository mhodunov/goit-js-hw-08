import imgSrc from "./image-gallery.js";

const galleryBox = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.lightbox');
const modalWindowImage = document.querySelector('.lightbox__image')
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
          src="${preview}"
          data-source="${original}"
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
  openModal();
  setImageAttributes(event);
  
}

function openModal() {
  modalWindow.classList.add('is-open');
};

function closeModal() {
  modalWindow.classList.remove('is-open');
};

function setImageAttributes(event) {
  modalWindowImage.setAttribute("src", event.target.dataset.source);
  modalWindowImage.setAttribute("alt", event.target.getAttribute("alt"));
}