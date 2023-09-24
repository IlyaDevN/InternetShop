import Swiper from 'swiper';
import { Pagination, Navigation,Thumbs } from 'swiper/modules';

const swiperThumbs = new Swiper(".swiper-thumbs", {
	spaceBetween: 34,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
});

const swiperMain = new Swiper(".swiper-main", {
	modules: [Pagination, Navigation, Thumbs],
	pagination: {
		el: ".swiper-pagination",
	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiperThumbs,
	},
});