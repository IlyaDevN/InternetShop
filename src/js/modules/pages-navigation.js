import { disableScroll, enableScroll } from './helpers.js';

const modal= document.querySelector(".pages-navigation__modal");
const openModalButton = document.querySelector(".pages-navigation__open-button");
const closeModalButton = modal.querySelector(".pages-navigation__close-button");
const links = modal.querySelectorAll(".pages-navigation__link");

openModalButton.onclick = openModal;
closeModalButton.onclick = closeModal;
links.forEach(link => link.addEventListener("click", relocateAfterClosingModal));

function openModal() {
	modal.showModal();
	modal.addEventListener("click", closeModalByOverlay, {once: true});
	window.addEventListener("keydown", keyDownHandler, {once: true});
	disableScroll();
}

function closeModal() {
	modal.close();
	enableScroll();
}

function relocateAfterClosingModal(event) {
	event.preventDefault();
	modal.addEventListener("transitionend", () => location.replace(event.target.href), {once: true});
	closeModal();
}

function keyDownHandler(event) {
	if(event.key === "Escape") {
		closeModal();
	}
}

function closeModalByOverlay(event) {
	if(!event.target.closest(".pages-navigation__content")) {
		closeModal();
	}
}