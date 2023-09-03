const PAGE_TOP = 0;
const button = document.getElementById("buttonScrollTop");
const observedTarget = document.querySelector(".categories-main, .top-content__poster");

button.addEventListener("click", ()=> window.scrollTo({
	top: PAGE_TOP,
	behavior: "smooth"
}));

const buttonObserver = new IntersectionObserver(([entry]) => {
	if(!entry.isIntersecting) {
		button.disabled = false;
	} else {
		button.disabled = true;
	}
});

if(observedTarget) {
	buttonObserver.observe(observedTarget);
}