import { disableScroll, enableScroll } from './helpers.js';

const openCartButtons = document.querySelectorAll(".cart__button, .header__cart-icon");
const modalCart = document.querySelector(".cart");
const closeCartButton = document.querySelector(".cart__close-button");

openCartButtons.forEach(openButton => openButton.onclick = openModal);
closeCartButton.onclick = closeModal;

function openModal() {
	modalCart.classList.add("active");
	modalCart.showModal();
	disableScroll();
}

function closeModal() {
	modalCart.addEventListener("transitionend", modalCart.close, {once: true});
	modalCart.classList.remove("active");
	enableScroll();
}