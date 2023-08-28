import { mqlMin768 } from './mediaQueries.js';

if(!mqlMin768.matches) {
	const modal = document.querySelector(".modal__menu");
	const openButton = document.querySelector(".menu__open-button");
	const closeButton = modal.querySelector(".menu__close-button");
	const menuNameButton = document.querySelector(".menu__name_button");
	const menuListContainerMain = modal.querySelector(".menu__list-container-main");
	const menuListContainer = modal.querySelector(".menu__list-container");
	const menuItems = modal.querySelectorAll(".menu__item");
	const menuSubItems = modal.querySelectorAll(".menu__sub-item");

	let activeSubMenuName = null;
	let activeSubMenuList = null;
	let activeMenuItem = null;

	menuItems.forEach(menuItem => menuItemHandler(menuItem));
	menuSubItems.forEach(menuSubItem => menuSubItemHandler(menuSubItem));

	closeButton.addEventListener("click", closeModal);
	menuNameButton.addEventListener("click", menuNameButtonHandler);
	openButton.addEventListener("click", () => {
		modal.classList.contains("active") ? closeModal() : openModal();
	});

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
		menuItemHandlerOnClick(menuItem);
	}

	function menuSubItemHandler(menuSubItem) {
		menuSubItemHandlerOnClick(menuSubItem);
	}

	function menuItemHandlerOnClick(menuItem) {
		menuItem.addEventListener("click", () => {

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
				closeModal();
			}
		})
	}

	function menuSubItemHandlerOnClick(menuSubItem) {
		menuSubItem.addEventListener("click", closeModal);
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

	function disableScroll() {
		document.body.classList.add("stop-scroll");
	}

	function enableScroll() {
		document.body.classList.remove("stop-scroll");
	}
}
