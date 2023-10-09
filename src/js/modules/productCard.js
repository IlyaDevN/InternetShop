const favButtons = document.querySelectorAll(".product-card__heart-icon");

favButtons.forEach(button => {
	button.addEventListener("click", event => {
		event.preventDefault();
		highLightFavButton(event);
	})
});

function highLightFavButton(event) {
	event.target.classList.toggle("active");
}
