export function disableScroll() {
	const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
	document.body.classList.add("stop-scroll");
	document.documentElement.style.setProperty("--width-of-scrollbar", scrollBarWidth + "px");
}

export function enableScroll() {
	document.body.classList.remove("stop-scroll");
	document.documentElement.style.setProperty("--width-of-scrollbar", 0);
}