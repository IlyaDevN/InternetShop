import { mqlMin768 } from './mediaQueries.js';
import { disableScroll, enableScroll } from './helpers.js'; 
import { filterModal, closeFilterModal } from './modal-filter.js';

export const menuModal = document.querySelector(".modal__menu");
const openButton = document.querySelector(".menu__open-button");
const closeButton = menuModal.querySelector(".menu__close-button");
const menuNameButton = document.querySelector(".menu__name_button");
const menuListContainerMain = menuModal.querySelector(".menu__list-container-main");
const menuListContainer = menuModal.querySelector(".menu__list-container");
const menuItems = menuModal.querySelectorAll(".menu__item");
const menuSubItems = menuModal.querySelectorAll(".menu__sub-item");

let activeSubMenuName = null;
let activeSubMenuList = null;
let activeMenuItem = null;

if(!mqlMin768.matches) {
	menuItems.forEach(menuItem => menuItemHandler(menuItem));
	menuSubItems.forEach(menuSubItem => menuSubItemHandler(menuSubItem));

	closeButton.onclick = closeMenuModal;
	menuNameButton.onclick = menuNameButtonHandler;
	openButton.onclick = openButtonHandler;
}

function openButtonHandler() {
	if(menuModal.classList.contains("active")) {
		closeMenuModal();
	} else {
		openMenuModalAfterCLosingFilterModal();
	}
}

function openMenuModalAfterCLosingFilterModal() {
	if(filterModal && filterModal.classList.contains("active")) {
		filterModal.addEventListener("transitionend", openMenuModal, {once: true});
		closeFilterModal();
	} else {
		openMenuModal();
	}
}

function openMenuModal() {
	menuModal.classList.add("active");
	openButton.classList.add("active");
	disableScroll();
}

export function closeMenuModal() {
	menuModal.classList.remove("active");
	openButton.classList.remove("active");
	menuListContainerMain.classList.remove("inactive");
	menuNameButton.classList.remove("active");
	enableScroll();

	menuListContainer.classList.remove("active");

	if (activeSubMenuName) {
		activeSubMenuName.classList.remove("active");
		activeSubMenuName = null;
	}

	if (activeSubMenuList) {
		activeSubMenuList.classList.remove("active");
		activeSubMenuList = null;
	}

	if (activeMenuItem) {
		activeMenuItem.classList.remove("active");
		activeMenuItem = null;
	}
}

function menuItemHandler(menuItem) {
	menuItem.addEventListener("click", (event) => {

		if (activeMenuItem) {
			activeMenuItem.classList.remove("active");
		}

		if (activeSubMenuName) {
			activeSubMenuName.classList.remove("active");
		}

		if (activeSubMenuList) {
			activeSubMenuList.classList.remove("active");
		}

		if (menuItem.dataset.hasOwnProperty("link")) {
			const subMenuName = document.getElementById(`${menuItem.dataset.link}-subname`);
			const subMenuList = document.getElementById(menuItem.dataset.link);

			menuItem.classList.add("active");
			menuListContainer.classList.add("active");
			subMenuName.classList.add("active");
			subMenuList.classList.add("active");
			menuNameButton.classList.add("active");
			menuListContainerMain.classList.add("inactive");

			activeMenuItem = menuItem;
			activeSubMenuName = subMenuName;
			activeSubMenuList = subMenuList;
		} else {
			event.preventDefault();
			relocateAfterClosingModal(event);
		}
	})
}

function menuSubItemHandler(menuSubItem) {
	menuSubItem.addEventListener("click", (event) => {
		event.preventDefault();
		relocateAfterClosingModal(event);
	});
}

function menuNameButtonHandler() {
	if (menuNameButton.classList.contains("active")) {

		menuListContainerMain.classList.remove("inactive");
		menuListContainer.classList.remove("active");
		activeMenuItem.classList.remove("active");
		activeSubMenuName.classList.remove("active");
		activeSubMenuList.classList.remove("active");
		menuNameButton.classList.remove("active");
	}
}

function relocateAfterClosingModal(event) {
	menuModal.addEventListener("transitionend", () => {
		const redirectedLink = event.target.href;
		location.replace(redirectedLink);
	}, {once: true});
	closeMenuModal();
}