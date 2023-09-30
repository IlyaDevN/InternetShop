import { mqlMin768 } from "./mediaQueries.js";
import { disableScroll, enableScroll } from './helpers.js';

const openModalButton = document.querySelector(".size-table-button");
const closeModalButton = document.querySelector(".modal-size-table__close-button");
const modal = document.querySelector(".modal-size-table");
const openProductParametrsButton = document.querySelector(".link-wrapper_inside");
const productParametrs = document.querySelector(".product-parametrs");
const openPersonParametrsButton = document.querySelector(".link-wrapper_outside");
const personParametrs = document.querySelector(".person-parametrs");

openModalButton.onclick = openModal;

if(!mqlMin768.matches) {
	personParametrs.classList.add("active");
	openProductParametrsButton.onclick = openProductParametrs;
	openPersonParametrsButton.onclick = openPersonParametrs;
}

function openModal() {
	modal.showModal();
	disableScroll();
	closeModalButton.addEventListener("click", closeModal, {once: true});
}

function closeModal() {
	modal.close();
	enableScroll();
}

function openProductParametrs() {
	personParametrs.classList.remove("active");
	productParametrs.classList.add("active");
}

function openPersonParametrs() {
	personParametrs.classList.add("active");
	productParametrs.classList.remove("active");
}

