import { disableScroll, enableScroll } from './helpers.js'; 
import { menuModal, closeMenuModal } from './modal-menu.js';

export const filterModal = document.querySelector(".modal__filter");
const openButton = document.querySelector(".menu__filter-button");
const closeButton = filterModal?.querySelector(".filter__close-button");
const filterContainer = filterModal?.querySelector(".filter__container");
const filterListItems = filterModal?.querySelectorAll(".categories-item__button");
const filterListSubItems = filterModal?.querySelectorAll(".filter-item-label");

if(filterModal) {
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
		const filterSection = event.target.closest(".filter-item-container");
		const activeFilterSection =  filterContainer.querySelector(".filter-item-container.active");
		
		if(!activeFilterSection) {
			activateFilterSection(filterSection);
			return;
		}

		if(activeFilterSection === filterSection) {
			deactivateFilterSection(activeFilterSection);
			return;
		}

		deactivateFilterSection(activeFilterSection);
		activateFilterSection(filterSection);
	})
}

function activateFilterSection(section) {
	section.classList.add("active");
	const categorySublist = section.querySelector(".categories-item__subList");
	if(categorySublist) {
		categorySublistOpen(categorySublist);
	}
}

function deactivateFilterSection(section) {
	section.classList.remove("active");
	const categorySublist = section.querySelector(".categories-item__subList");
	if(categorySublist) {
		categorySublistClose(categorySublist);
		deactivateActiveFilterItem(section);
	}
}

function categorySublistOpen(subList) {
	const menuListHeight = getSublistHeight(subList);
	subList.style.height = `${menuListHeight}px`;
}

function categorySublistClose(subList) {
	subList.style.height = 0;
}

function deactivateActiveFilterItem(section) {
	const activeFilterItem = section.querySelector(".filter-item.active");
	activeFilterItem?.classList.remove("active");
}

function getSublistHeight(subList) {
	const subListGap = parseInt(window.getComputedStyle(subList).gap);
	const subListItemHeight = subList.querySelector("li").offsetHeight;
	const subListItemsAmount = subList.childElementCount;
	const totalGap = subListGap * (subListItemsAmount - 1);
	const sublistHeight = subListItemHeight * subListItemsAmount + totalGap;
	return sublistHeight;
}

function filterSubItemHandler(subItem) {
	subItem.addEventListener("click", (event) => {
		if(!event.target.classList.contains("filter-item-marker")) {
			return;
		}
		const button = event.target;
		const filterSection = button.closest(".filter-item-container");
		const filterItem = button.closest(".filter-item");
		const prevActiveFilterItem = filterSection.querySelector(".filter-item.active");
		if(!prevActiveFilterItem) {
			filterItem.classList.add("active");
			return;
		}

		if(prevActiveFilterItem === filterItem) {
			filterItem.classList.remove("active");
			return;
		}

		prevActiveFilterItem.classList.remove("active");
		filterItem.classList.add("active");
	})
}