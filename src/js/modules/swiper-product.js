import Swiper from 'swiper';
import { Pagination } from 'swiper/modules';

const swiper = new Swiper(".swiper", {
	modules: [Pagination],
	pagination: {
		el: ".swiper-pagination",
	},
});