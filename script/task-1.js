import imgSrc from "./image-gallery.js";

const galleryBox = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalWindowImage = document.querySelector('.lightbox__image')
const closeModalButton = document.querySelector('[data-action="close-lightbox"]')

const createItems = createGalleryItem(imgSrc);
galleryBox.insertAdjacentHTML('beforeend', createItems);

galleryBox.addEventListener('click', onGalleryClick);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalOnEsc);

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
  clearImageAttributes();
};

function closeModalOnEsc(event) {
  if(event.code !== "Escape" || !modalWindow.classList.contains('is-open')) return;
  closeModal();
};

function setImageAttributes(event) {
  modalWindowImage.setAttribute("src", event.target.dataset.source);
  modalWindowImage.setAttribute("alt", event.target.getAttribute("alt"));
}

function clearImageAttributes() {
  modalWindowImage.setAttribute("src", "");
  modalWindowImage.setAttribute("alt", "");
}