import Swiper from 'swiper';
import { Pagination, Navigation, Thumbs } from 'swiper/modules';

const swiperThumbs = new Swiper(".swiper-thumbs", {
	spaceBetween: 34,
	slidesPerView: 4,
	freeMode: true,
	watchSlidesProgress: true,
	direction: 'horizontal',
	breakpoints: {
		1000: {
			direction: 'vertical',
		}
	},

});

const thumbsBulletContainer = swiperThumbs.el.querySelector(".custom-vertical-pagination");
const bullets = [];

const swiperMain = new Swiper(".swiper-main", {
	modules: [Pagination, Navigation, Thumbs],
	pagination: {
		el: ".swiper-main-pagination",

	},
	navigation: {
		nextEl: ".swiper-button-next",
		prevEl: ".swiper-button-prev",
	},
	thumbs: {
		swiper: swiperThumbs,
	},
	on: {
		init: (swiper) => {
			thumbsPaginationInitialization(swiper);
		},
		slideChange: (swiper) => {
			bulletsChangeHadler(swiper);
		},
	},
	breakpoints: {
		1000: {
			pagination: {
				enabled: false,
			},
		}
	},
});

function thumbsPaginationInitialization(swiper) {
	if(swiperThumbs.isHorizontal()) {
		return;
	}
	const slidesAmount = swiper.slides.length;
	for(let i = 0; i < slidesAmount; i++) {
		const bullet = document.createElement("div");
		bullet.classList.add("custom-pagination-bullet");
		thumbsBulletContainer.append(bullet);
		bullets.push(bullet);
	}
	
	bullets[swiper.activeIndex].classList.add("active");
}

function bulletsChangeHadler(swiper) {
	bullets.forEach((bullet, index) => {
		if(bullet.classList.contains("active")) {
			bullet.classList.remove("active");
		}
		if(index === swiper.activeIndex) {
			bullet.classList.add("active");
		}
	})
}
