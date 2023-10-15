const header = document.querySelector(".header");
const headerContainer = document.querySelector(".header__container");

const headerObserver = new IntersectionObserver(([entry]) => {
	if(!entry.isIntersecting) {
		if(headerContainer.classList.contains("inactive")) {
			headerContainer.classList.remove("inactive");
		}
		
		headerContainer.classList.add("active");
	} else {
		if(headerContainer.classList.contains("active")) {
			headerContainer.classList.remove("active");
		}
		// == Плавный подъем меню ==
		// if(entry.boundingClientRect.y !== 0) {
		// 	headerContainer.classList.add("inactive");
		// 	headerContainer.addEventListener("animationend", () => {
		// 		headerContainer.classList.remove("inactive");
		// 	}, {once: true})
		// }
	}
}, {rootMargin: "200px 0px 0px 0px", });

headerObserver.observe(header);

