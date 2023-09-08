import { mqlMin768 } from './mediaQueries.js';
import { disableScroll, enableScroll } from './helpers.js'; 
import { menuModal, closeMenuModal } from './modal-menu.js';

export const filterModal = document.querySelector(".modal__filter");
const openButton = document.querySelector(".menu__filter-button");
const closeButton = filterModal?.querySelector(".filter__close-button");
const filterListMain = filterModal?.querySelector(".filter__categories-list");
const filterListItems = filterListMain?.querySelectorAll(".categories-item__open-link");
const filterListSubItems = filterModal?.querySelectorAll(".filter-item-text");

if(!mqlMin768.matches && window.location.pathname === "/categories.html") {
	openButton.onclick = openButtonHandler;
	closeButton.onclick = closeFilterModal;
	filterListItems.forEach(list => { filterItemHandler(list) });
	filterListSubItems.forEach(subItem => { filterSubItemHandler(subItem) })
}

function openFilterModal() {
	filterModal.classList.add("active");
	openButton.classList.add("active");
	disableScroll();
}

export function closeFilterModal() {
	filterModal.classList.remove("active");
	openButton.classList.remove("active");
	enableScroll();
}

function openButtonHandler() {
	if(filterModal.classList.contains("active")) {
		closeFilterModal();
	} else {
		openFilterModalAfterCLosingMenuModal();
	}
}

function openFilterModalAfterCLosingMenuModal() {
	if(menuModal && menuModal.classList.contains("active")) {
		menuModal.addEventListener("transitionend", openFilterModal, {once: true});
		closeMenuModal();
	} else {
		openFilterModal();
	}
}

function filterItemHandler(list) {
	list.addEventListener("click", event => {
		const listButton = event.target;
		listButton.classList.toggle("active");
		const menuList = listButton.closest(".categories-item").querySelector(".categories-item__subList");
		if (!menuList) {
			return;
		}
		const menuListGap = parseInt(window.getComputedStyle(menuList).gap);
		const listHeight = menuList.querySelector("li").offsetHeight;
		const listAmout = menuList.childElementCount;
		const totalGap = menuListGap * (listAmout - 1);
		const menuListHeight = listHeight * listAmout + totalGap;
		if (menuList.style.height && menuList.style.height !== "0px") {
			menuList.style.height = 0;
		} else {
			menuList.style.height = `${menuListHeight}px`;
		}
		menuList.classList.toggle("active");
	})
}

function filterSubItemHandler(subItem) {
	subItem.addEventListener("click", (event) => {
		const button = event.target;
		const filterSection = button.closest(".filter-section");
		const prevActiveElement = filterSection.querySelector(".filter-item.active");
		prevActiveElement?.classList.remove("active");
		const filterItem = button.closest(".filter-item");
		if(prevActiveElement == filterItem) {
			return;
		}
		filterItem.classList.toggle("active");
	})
}
