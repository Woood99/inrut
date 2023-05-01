// =========================================================================================



import {
    auto
} from '@popperjs/core';
import Swiper, {
    Navigation,
    Pagination,
    Thumbs,
    EffectFade
} from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs, EffectFade]);



// =========================================================================================




function initSliders() {
    if (document.querySelector('.header-main__banners')) {
        new Swiper('.header-main__banners', {
            observer: true,
            observeParents: true,
            autoHeight: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            speed: 800,
            breakpoints: {
                650: {
                    slidesPerView: 1.4,
                    spaceBetween: 24,
                },
                950: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
            },

        });
    }
    if (document.querySelector('.main-banners__container')) {
        new Swiper('.main-banners__container', {
            observer: true,
            observeParents: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                650: {
                    slidesPerView: 1.4,
                    spaceBetween: 24,
                },
                950: {
                    slidesPerView: 2,
                    spaceBetween: 32,
                },
            },
        });
    }
    objectSlider();

    if (document.querySelector('.review-item__photo')) {
        const sliders = document.querySelectorAll('.review-item__photo');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 2.2,
                spaceBetween: 8,
                speed: 800,
                breakpoints: {
                    768: {
                        slidesPerView: 4,
                    },
                },
            });
        })
    }

    if (document.querySelector('.interest-rate__slider')) {
        const sliders = document.querySelectorAll('.interest-rate__slider');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 'auto',
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.interest-rate').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.interest-rate').querySelector('.nav-arrow-secondary--next'),
                },
            });
        })
    }
    if (document.querySelector('.object-similar__items')) {
        const sliders = document.querySelectorAll('.object-similar__items');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.object-similar').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.object-similar').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    568: {
                        slidesPerView: 2,
                    },
                    1112: {
                        slidesPerView: 3,
                    }
                },
            });
        })
    }
}


function objectSlider() {
    const container = document.querySelector('.object-slider');
    if (!container) return;
    const nav = container.querySelector('.object-slider-nav__wrapper');
    const body = container.querySelector('.object-slider-body__wrapper');
    let navSlider = new Swiper(nav, {
        slidesPerView: 3,
        spaceBetween: 5,
        observer: true,
        observeParents: true,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
    });
    let bodySlider = new Swiper(body, {
        spaceBetween: 15,
        observer: true,
        loop: true,
        observeParents: true,
        navigation: {
            prevEl: container.querySelector('.nav-arrow-primary--prev'),
            nextEl: container.querySelector('.nav-arrow-primary--next'),
        },
        pagination: {
            el: container.querySelector('.pagination-primary'),
            type: 'fraction',
        },
        thumbs: {
            swiper: navSlider,
        },
    })
}


// =========================================================================================





window.addEventListener("load", function (e) {
    initSliders();
});





// =========================================================================================
