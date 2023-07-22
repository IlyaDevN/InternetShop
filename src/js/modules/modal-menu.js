const modal = document.querySelector(".modal__menu");
const openButton = document.querySelector(".menu__open-button");
const closeButton = modal.querySelector(".menu__close-button");

openButton.addEventListener("click", () => {
	modal.classList.toggle("opened");
	openButton.classList.toggle("opened");
});

closeButton.addEventListener("click", () => {
	modal.classList.remove("opened");
	openButton.classList.remove("opened");
});