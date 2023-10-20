const deliveryMethodButtons = document.querySelectorAll(".delivery__method-button, .payment__method-button");
let activeDetails = null;

deliveryMethodButtons.forEach(button => button.addEventListener("change", buttonHandler));

function buttonHandler(event) {
	activeDetails?.removeAttribute("open");

	let details = event.target.closest("details");
	details.setAttribute("open", true);
	activeDetails = details;
}