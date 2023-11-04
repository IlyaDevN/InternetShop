import { disableScroll, enableScroll } from './helpers.js';

const modal = document.querySelector(".modal-choose-size");
const openModalButton = document.querySelector(".product-content__choose-size-button");
const closeModalButton = modal.querySelector(".modal-choose-size__marker");
const sizeListButtons = modal.querySelectorAll(".size-list__button-input");
const showedSize = document.querySelector(".product-content__chosen-size");

openModalButton.addEventListener("click", openModal);
closeModalButton.addEventListener("click", closeModal);
modal.addEventListener("click", closeModalByOverlay);
sizeListButtons.forEach(button => button.addEventListener("click", setChosenSize));

function openModal() {
	modal.showModal();
	disableScroll();
}

function closeModal() {
	modal.close();
	enableScroll();
}

function closeModalByOverlay(event) {
	if(event.target.closest(".modal-choose-size__content")) {
		return;
	}
	closeModal();
}

function setChosenSize(event) {
	showedSize.innerHTML = event.target.value;
	closeModal();
}