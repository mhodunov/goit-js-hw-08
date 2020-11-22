//Импорт объекта с галереей
import imgSrc from "./image-gallery.js";

//Находим необходимые элементы в разметке
const galleryBox = document.querySelector('.js-gallery');
const modalWindow = document.querySelector('.js-lightbox');
const modalWindowImage = document.querySelector('.lightbox__image')
const closeModalButton = document.querySelector('[data-action="close-lightbox"]')

const createItems = createGalleryItem(imgSrc); //Создание разметки
galleryBox.insertAdjacentHTML('beforeend', createItems); //Вставка разметки в ul.js-gallery
const galleryItemsQty = document.querySelectorAll('.gallery__image').length; //Кол-во элементов в галерее

//Слушатели событий
galleryBox.addEventListener('click', onGalleryClick); //Открытие по клику на изображение
closeModalButton.addEventListener('click', closeModal); //Закрытие по клику на кнопку
window.addEventListener('keydown', closeModalOnEsc); //Закрытие по нажатию Esc
window.addEventListener('keydown', carousel); //Перелистывание вправо/влево
modalWindow.addEventListener('click', closeModalOnSideClick); //Закрытие по клику на область вокруг изображения

//Добавление разметки галереи с данными из объекта
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
//Открытие модального окна по клику на изображение
function onGalleryClick(event) {
  event.preventDefault()
  if(event.target.nodeName !== "IMG" || modalWindow.classList.contains('is-open')) return;
  openModal();
  setImageAttributes(event);
  
}
//Добавление класса .is-open при открытии модального окна
function openModal() {
  modalWindow.classList.add('is-open');
};
//Функция для работы перелистывания вправо/влево
function carousel(event) {
  if (event.code !== "ArrowRight" && event.code !== "ArrowLeft" || !modalWindow.classList.contains('is-open')) return;
  if (event.code === "ArrowRight") {
    carouselForward();
  };
  if (event.code === "ArrowLeft") {
    carouselBackward();
  };
};
//Перелистывание изображения вперед при нажатии стрелки
function carouselForward() {
  let index = +modalWindowImage.dataset.index + 1;
  if (index > galleryItemsQty) {
    index = 1;
  }; 
  switchImage(index);
};
//Перелистывание изображения назад при нажатии стрелки
function carouselBackward() {
  let index = +modalWindowImage.dataset.index - 1;
  if(index < 1) {
    index = galleryItemsQty;
  };
  switchImage(index);
};
//Закрытие модального окна
function closeModal() {
  modalWindow.classList.remove('is-open');
  clearImageAttributes();
};
//Закрытие модального окна при нажатии на Esc
function closeModalOnEsc(event) {
  if(event.code !== "Escape" || !modalWindow.classList.contains('is-open')) return;
  closeModal();
};
//Закрытие модального окна при клике на область вокруг изображения
function closeModalOnSideClick(event) {
  if(event.target.nodeName === 'IMG') return;
  closeModal();
};
//Установка атрибутов изображения при открытии модального окна
function setImageAttributes(event) {
  modalWindowImage.setAttribute("src", event.target.dataset.source);
  modalWindowImage.setAttribute("alt", event.target.getAttribute("alt"));
  modalWindowImage.setAttribute("data-index", event.target.dataset.index);
};
//Очистка атрибутов изображения после закрытия модального окна
function clearImageAttributes() {
  modalWindowImage.setAttribute("src", "");
  modalWindowImage.setAttribute("alt", "");
  modalWindowImage.setAttribute("data-index", "");
};
//Переключние изображений при нажатии стрелок влево/вправо
function switchImage(index) {
  const nextImage = document.querySelector(`[data-index="${index}"]`);

  modalWindowImage.setAttribute("src", nextImage.dataset.source);
  modalWindowImage.setAttribute("alt", nextImage.getAttribute("alt"));
  modalWindowImage.setAttribute("data-index", index);
}