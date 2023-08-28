import { debounce } from 'throttle-debounce';
import { mqlMin768 } from './mediaQueries.js';

if(mqlMin768.matches) {
	const modal = document.querySelector(".modal__menu");
	const menuListContainerMain = modal.querySelector(".menu__list-container-main");
	const menuListContainer = modal.querySelector(".menu__list-container");
	const allMenuItems = Array.from(modal.querySelectorAll(".menu__item"));
	const menuItemsEmpty = allMenuItems.filter(item => !item.dataset.hasOwnProperty("link"));
	const menuItems = allMenuItems.filter(item => item.dataset.hasOwnProperty("link"));
	const menuSubItems = modal.querySelectorAll(".menu__sub-item");
	const closeDelay = 500;
	const animationDelay = 700;
	let activeSubMenuList = null;
	let activeMenuItem = null;

	const debouncedCloseMenu = debounce(closeDelay, closeMenu);
	const cancelDebouncedCloseMenu = () => debouncedCloseMenu.cancel({ upcomingOnly: true });

	menuItems.forEach(menuItem => openMenu(menuItem));
	menuItemsEmpty.forEach(emptyMenuItem => emptyMenuItem.addEventListener("mouseover", closeMenu));
	menuSubItems.forEach(menuSubItem => menuSubItem.addEventListener("click", closeMenu));

	menuListContainerMain.addEventListener("mouseover", cancelDebouncedCloseMenu);
	menuListContainerMain.addEventListener("mouseout", debouncedCloseMenu);
	menuListContainer.addEventListener("mouseover", cancelDebouncedCloseMenu);
	menuListContainer.addEventListener("mouseout", debouncedCloseMenu);
	
	function openMenu(menuItem) {
		menuItem.addEventListener("mouseover", () => {

			if (menuItem == activeMenuItem) {
				return;
			}

			cleanActiveElements();

			const subMenuList = document.getElementById(menuItem.dataset.link);
			menuItem.classList.add("active");
			menuListContainer.classList.add("active");
			subMenuList.classList.add("active");
			animateMouseOver(subMenuList);
			activeSubMenuList = subMenuList;
			activeMenuItem = menuItem;
		})
	}

	function closeMenu() {

		if (activeSubMenuList) {
			animateMouseOut(activeSubMenuList).then(() => {
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
			animateMouseOut(activeSubMenuList);
			activeSubMenuList.classList.remove("active");
		}
	}

	function animateMouseOver(elem) {
		elem.animate([
			{ transform: "translateX(-100vw)" },
			{ transform: "translateX(0)" }
		], {
			duration: animationDelay,
			iterations: 1,
		})
	}

	function animateMouseOut(elem) {
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

