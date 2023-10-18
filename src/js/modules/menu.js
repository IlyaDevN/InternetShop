import { mqlMin768 } from './mediaQueries.js';

if(mqlMin768.matches) {
	const modal = document.querySelector(".modal__menu");
	const menuListContainer = modal.querySelector(".menu__list-container");
	const allMenuItems = Array.from(modal.querySelectorAll(".menu__item"));
	const menuItemsEmpty = allMenuItems.filter(item => !item.dataset.hasOwnProperty("link"));
	const menuItems = allMenuItems.filter(item => item.dataset.hasOwnProperty("link"));
	const menuSubItems = modal.querySelectorAll(".menu__sub-item");
	const animationDelay = 700;
	let activeSubMenuList = null;
	let activeMenuItem = null;

	menuItems.forEach(menuItem => openMenu(menuItem));
	menuItemsEmpty.forEach(emptyMenuItem => emptyMenuItem.addEventListener("click", closeMenu));
	menuSubItems.forEach(menuSubItem => menuSubItem.addEventListener("click", closeMenu));
	
	function openMenu(menuItem) {
		menuItem.addEventListener("click", () => {

			if (menuItem == activeMenuItem) {
				closeMenu();
				return;
			}

			cleanActiveElements();

			const subMenuList = document.getElementById(menuItem.dataset.link);
			menuItem.classList.add("active");
			menuListContainer.classList.add("active");
			subMenuList.classList.add("active");
			animateOpening(subMenuList);
			activeSubMenuList = subMenuList;
			activeMenuItem = menuItem;
		})
	}

	function closeMenu() {

		if (activeSubMenuList) {
			animateClosing(activeSubMenuList).then(() => {
				menuListContainer.classList.remove("active");
			})
			activeSubMenuList.classList.remove("active");
			activeSubMenuList = null;
		}

		if (activeMenuItem) {
			activeMenuItem.classList.remove("active");
			activeMenuItem = null;
		}
	}

	function cleanActiveElements() {
		if (activeMenuItem) {
			activeMenuItem.classList.remove("active");
		}

		if (activeSubMenuList) {
			animateClosing(activeSubMenuList);
			activeSubMenuList.classList.remove("active");
		}
	}

	function animateOpening(elem) {
		elem.animate([
			{ transform: "translateX(-100vw)" },
			{ transform: "translateX(0)" }
		], {
			duration: animationDelay,
			iterations: 1,
		})
	}

	function animateClosing(elem) {
		const animation = elem.animate([
			{ transform: "translateX(0)" },
			{ transform: "translateX(100vw)" }
		], {
			duration: animationDelay,
			iterations: 1,
		})
		return animation.finished;
	}
}

