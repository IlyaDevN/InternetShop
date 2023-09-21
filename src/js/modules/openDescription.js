const text = document.querySelector(".description-text");
const button = document.querySelector(".description-unwrap-button");
const clientHeight = text.clientHeight;
const scrollHeight = text.scrollHeight;

text.style.setProperty('--height', text.clientHeight + "px");
text.dataset.clientHeight = text.clientHeight;
checkButtonVisibility();

button.addEventListener("click", () => {
	
	if(text.classList.contains("opened")) {
		closeText();
		button.innerHTML = "Развернуть описание";
	} else {
		openText();
		button.innerHTML = "Свернуть описание";
	}
});

function openText() {
	text.classList.add("opened");
	text.style.setProperty('--height', scrollHeight + "px");
}

function closeText() {
	text.classList.remove("opened");
	text.style.setProperty('--height', clientHeight + "px");
}

function checkButtonVisibility() {
	if(scrollHeight <= clientHeight) {
		button.classList.remove("visible");
	} else {
		button.classList.add("visible");
	}
}