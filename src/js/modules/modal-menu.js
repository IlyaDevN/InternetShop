// import { mql768 } from './mediaQueries.js';

const modal = document.querySelector(".modal__menu");
const openButton = document.querySelector(".menu__open-button");
const closeButton = modal.querySelector(".menu__close-button");
const menuNameButton = document.querySelector(".menu__name_button");
const menuListContainerMain = modal.querySelector(".menu__list-container-main");
const menuItems = modal.querySelectorAll(".menu__item, .menu__sub-item");

let activeSubNameMenu = null;
let activeSubMenu = null;
let activeMenuItem = null;

openButton.addEventListener("click", () => {
	if (modal.classList.contains("active")) {
		closeModal();
	} else {
		openModal();
	}
});

closeButton.addEventListener("click", closeModal);
menuItems.forEach((item) => { menuItemHandler(item) });
menuNameButton.addEventListener("click", menuNameButtonHandler);

function openModal() {
	modal.classList.add("active");
	openButton.classList.add("active");
	disableScroll();
}

function closeModal() {
	modal.classList.remove("active");
	openButton.classList.remove("active");
	menuListContainerMain.classList.remove("inactive");
	menuNameButton.classList.remove("active");

	// if (mql768.matches) {
	// 	categories.classList.remove("menu-open");
	// }

	if (activeSubNameMenu) {
		activeSubNameMenu.classList.remove("active");
	}

	if (activeSubMenu) {
		activeSubMenu.classList.remove("active");
	}
	enableScroll();
}

function menuItemHandler(menuItem) {
	menuItem.addEventListener("click", () => {

		if (activeMenuItem) {
			activeMenuItem.classList.remove("active");
		}

		if (activeSubNameMenu) {
			activeSubNameMenu.classList.remove("active");
		}

		if (activeSubMenu) {
			activeSubMenu.classList.remove("active");
		}

		if (menuItem.dataset.hasOwnProperty("link")) {
			const subNameMenu = document.getElementById(`${menuItem.dataset.link}-subname`);
			const subMenu = document.getElementById(menuItem.dataset.link);

			menuItem.classList.add("active");
			subNameMenu.classList.add("active");
			subMenu.classList.add("active");
			menuNameButton.classList.add("active");
			menuListContainerMain.classList.add("inactive");

			// if (mql768.matches) {
			// 	categories.classList.add("menu-open");
			// }

			activeMenuItem = menuItem;
			activeSubNameMenu = subNameMenu;
			activeSubMenu = subMenu;
		} else {
			closeModal();
		}
	})
}

function menuNameButtonHandler() {
	if (menuNameButton.classList.contains("active")) {

		menuListContainerMain.classList.remove("inactive");
		activeMenuItem.classList.remove("active");
		activeSubNameMenu.classList.remove("active");
		activeSubMenu.classList.remove("active");
		menuNameButton.classList.remove("active");
	}
}

function disableScroll() {
	document.body.classList.add("stop-scroll");
}

function enableScroll() {
	document.body.classList.remove("stop-scroll");
}