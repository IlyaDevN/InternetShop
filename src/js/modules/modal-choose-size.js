import { disableScroll, enableScroll } from './helpers.js';

const modal = document.querySelector(".modal-choose-size");
const openModalButton = document.querySelector(".product-content__choose-size-button");
const closeModalButton = modal.querySelector(".modal-choose-size__marker");
const sizeListButtons = modal.querySelectorAll(".size-list__button");
const showedSize = document.querySelector(".product-content__chosen-size");
let currentActiveSizeButton = null;

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
	if(currentActiveSizeButton) {
		currentActiveSizeButton.classList.remove("active");
	}

	const button = event.target.closest(".size-list__button");
	const buttonText = button.querySelector(".size-list__name").innerHTML;
	showedSize.innerHTML = buttonText;
	button.classList.add("active");
	currentActiveSizeButton = button;
	closeModal();
}