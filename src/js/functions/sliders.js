// =========================================================================================



import Swiper, {
    Navigation,
    Pagination,
    Thumbs
} from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs]);



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
}


function objectSlider() {
    const container = document.querySelector('.object-slider');
    if (!container) return;
    const nav = container.querySelector('.object-slider-nav__wrapper');
    const body = container.querySelector('.object-slider-body__wrapper');
    let navSlider = new Swiper(nav, {
        slidesPerView: 3,
        spaceBetween: 21,
        observer: true,
        observeParents: true,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        direction: 'vertical',
    });
    let bodySlider = new Swiper(body, {
        spaceBetween: 10,
        observer: true,
        observeParents: true,
        navigation: {
            prevEl: container.querySelector('.nav-arrow-primary--prev'),
            nextEl: container.querySelector('.nav-arrow-primary--next'),
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
