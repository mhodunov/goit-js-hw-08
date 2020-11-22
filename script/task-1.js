import imgSrc from "./image-gallery.js";

const galleryBox = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalWindowImage = document.querySelector('.lightbox__image')
const closeModalButton = document.querySelector('[data-action="close-lightbox"]')

const createItems = createGalleryItem(imgSrc);
galleryBox.insertAdjacentHTML('beforeend', createItems);

const galleryItemsQty = document.querySelectorAll('.gallery__image').length;
const currentImage = document.querySelector('.lightbox__image');

galleryBox.addEventListener('click', onGalleryClick);
closeModalButton.addEventListener('click', closeModal);
window.addEventListener('keydown', closeModalOnEsc);
window.addEventListener('keydown', carousel);
modalWindow.addEventListener('click', closeModalOnSideClick);

function createGalleryItem(imgSrc) {
  return imgSrc
  .map(({ preview, original, description }, idx) => {
    return `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          data-index="${idx + 1}"
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
  if(event.target.nodeName !== "IMG" || modalWindow.classList.contains('is-open')) return;
  openModal();
  setImageAttributes(event);
  
}

function openModal() {
  modalWindow.classList.add('is-open');
};

function carousel(event) {
  if (event.code !== "ArrowRight" && event.code !== "ArrowLeft" || !modalWindow.classList.contains('is-open')) return;
  if (event.code === "ArrowRight") {
    carouselForward();
  };
  if (event.code === "ArrowLeft") {
    carouselBackward();
  };
};

function carouselForward() {
  let index = +currentImage.dataset.index + 1;
  if (index > galleryItemsQty) {
    index = 1;
  }; 
  switchImage(index);
};

function carouselBackward() {
  let index = +currentImage.dataset.index - 1;
  if(index < 1) {
    index = galleryItemsQty;
  };
  switchImage(index);
};

function closeModal() {
  modalWindow.classList.remove('is-open');
  clearImageAttributes();
};

function closeModalOnEsc(event) {
  if(event.code !== "Escape" || !modalWindow.classList.contains('is-open')) return;
  closeModal();
};

function closeModalOnSideClick(event) {
  if(event.target.nodeName === 'IMG') return;
  closeModal();
};

function setImageAttributes(event) {
  modalWindowImage.setAttribute("src", event.target.dataset.source);
  modalWindowImage.setAttribute("alt", event.target.getAttribute("alt"));
  modalWindowImage.setAttribute("data-index", event.target.dataset.index);
};

function clearImageAttributes() {
  modalWindowImage.setAttribute("src", "");
  modalWindowImage.setAttribute("alt", "");
  modalWindowImage.setAttribute("data-index", "");
};

function switchImage(index) {
  const nextImage = document.querySelector(`[data-index="${index}"]`);

  currentImage.setAttribute("src", nextImage.dataset.source);
  currentImage.setAttribute("alt", nextImage.getAttribute("alt"));
  currentImage.setAttribute("data-index", index);
}