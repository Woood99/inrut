// =========================================================================================
import Swiper, {
    Navigation,
    Pagination,
    Thumbs,
    EffectFade
} from 'swiper';
Swiper.use([Navigation, Pagination, Thumbs, EffectFade]);

import modal from '../modules/modal';
import {
    _slideDown,
    _slideUp,
    _slideToggle,
} from '../support-modules/slide';


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
    if (document.querySelector('.home-banners__container')) {
        const slider = document.querySelector('.home-banners__container');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1.15,
            spaceBetween: 16,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1112: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
            },
            navigation: {
                prevEl: slider.closest('.home-banners').querySelector('.nav-arrow-secondary--prev'),
                nextEl: slider.closest('.home-banners').querySelector('.nav-arrow-secondary--next'),
            },
        });
    }
    if (document.querySelector('.home-price__items')) {
        const slider = document.querySelector('.home-price__items');
        new Swiper(slider, {
            observer: true,
            observeParents: true,
            slidesPerView: 1.15,
            spaceBetween: 10,
            autoHeight: true,
            speed: 800,
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1112: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
            },
            navigation: {
                prevEl: slider.closest('.home-price').querySelector('.nav-arrow-secondary--prev'),
                nextEl: slider.closest('.home-price').querySelector('.nav-arrow-secondary--next'),
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
                    577: {
                        slidesPerView: 2,
                    },
                    1113: {
                        slidesPerView: 3,
                    }
                },
            });
        })
    }
    if (document.querySelector('.block-stock__slider')) {
        const sliders = document.querySelectorAll('.block-stock__slider');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.block-stock').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.block-stock').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    }
                },
            });
        })
    }
    if (document.querySelector('.object-other-apartment__items')) {
        const sliders = document.querySelectorAll('.object-other-apartment__items');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.object-other-apartment').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.object-other-apartment').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    },
                },
            });
        })
    }
    if (document.querySelector('.object-apart-renov__images')) {
        const sliders = document.querySelectorAll('.object-apart-renov__images');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                lazy: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.object-apart-renov__item').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.object-apart-renov__item').querySelector('.nav-arrow-secondary--next'),
                },
            });
        })
    }
    if (document.querySelector('.object-construct-progress__items')) {
        const sliders = document.querySelectorAll('.object-construct-progress__items');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.object-construct-progress').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.object-construct-progress').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    },
                },
            });
        })
    }
    if (document.querySelector('.construct-progress-popup__images')) {
        const sliders = document.querySelectorAll('.construct-progress-popup__images');
        sliders.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: '.nav-arrow-primary--prev',
                    nextEl: '.nav-arrow-primary--next',
                },
                pagination: {
                    el: '.pagination-primary',
                    type: 'fraction',
                },
            });
        })
    }

    if (document.querySelector('.object-advantages')) {
        const container = document.querySelectorAll('.object-advantages');
        container.forEach(el => {
            const sliderEl = el.querySelector('.object-advantages__slider');

            let slider = new Swiper(sliderEl, {
                observer: true,
                observeParents: true,
                slidesPerView: 1.1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.object-advantages').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.object-advantages').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 1.8,
                    },
                    769: {
                        slidesPerView: 2.4,
                    },
                    1113: {
                        slidesPerView: 2,
                    }
                },
            });
            const objectAdvantages = () => {
                sliderMoreItem();
                itemPopup();

                function sliderMoreItem() {
                    const btn = el.querySelector('.object-advantages__btn');
                    btn.addEventListener('click', () => {
                        el.classList.toggle('_active');
                        if (el.classList.contains('_active')) {
                            btn.classList.add('_active');
                            slider.destroy();
                        } else {
                            btn.classList.remove('_active');
                            const topGap = window.pageYOffset + el.getBoundingClientRect().top;
                            const headerFixed = document.querySelector('.header-fixed');
                            const topHeaderMobile = document.querySelector('.top-page-inner');
                            if (window.innerWidth >= 1112) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight - 20 : topGap - 20,
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight - 20 : topGap - 20,
                                })
                            }
                            slider = new Swiper(sliderEl, {
                                observer: true,
                                observeParents: true,
                                slidesPerView: 1.1,
                                spaceBetween: 16,
                                speed: 800,
                                navigation: {
                                    prevEl: el.closest('.object-advantages').querySelector('.nav-arrow-secondary--prev'),
                                    nextEl: el.closest('.object-advantages').querySelector('.nav-arrow-secondary--next'),
                                },
                                breakpoints: {
                                    577: {
                                        slidesPerView: 1.8,
                                    },
                                    769: {
                                        slidesPerView: 2.4,
                                    },
                                    1113: {
                                        slidesPerView: 2,
                                    }
                                },
                            });
                        }
                    });
                }

                function itemPopup() {
                    const items = el.querySelectorAll('.object-advantages__card');
                    items.forEach(item => {
                        item.addEventListener('click', () => {
                            item.classList.add('_active');
                            const modalHTML = `
                            <div class="advantages-popup">
                            <div class="advantages-popup__container">
                                <button class="btn-reset advantages-popup__close" aria-label="Закрыть модальное окно">
                                    <svg>
                                        <use xlink:href="img/sprite.svg#x"></use>
                                    </svg>
                                    <span>Закрыть</span>
                                </button>
                                 <div class="advantages-popup__content">
                                        ${item.outerHTML}
                                 </div>
                            </div>
                            </div>
                            `;

                            modal(modalHTML, '.advantages-popup', 300, item);
                            document.querySelector('.advantages-popup .advantages-card').classList.remove('_active');
                        })
                    })
                }
            }
            objectAdvantages();
        })
    }
    if (document.querySelector('.room-body__items')) {
        const items = document.querySelectorAll('.room-body__items');
        items.forEach(el => {
            const slider = new Swiper(el, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                speed: 800,
                navigation: {
                    prevEl: el.closest('.room-body').querySelector('.nav-arrow-secondary--prev'),
                    nextEl: el.closest('.room-body').querySelector('.nav-arrow-secondary--next'),
                },
                breakpoints: {
                    577: {
                        slidesPerView: 2,
                    },
                    769: {
                        slidesPerView: 2.6,
                    },
                    1113: {
                        slidesPerView: 3,
                    }
                }
            });
            showContainer();


            function showContainer() {
                const btns = el.querySelectorAll('.card-scheme');
                const container = el.closest('.room-body').querySelector('.room-body__container');
                btns.forEach(btn => {
                    btn.addEventListener('click', (e) => {
                        btns.forEach(el => {
                            if (e.currentTarget !== el) el.classList.remove('_active');
                        });
                        btn.classList.toggle('_active');

                        const headerFixed = document.querySelector('.header-fixed');
                        const topHeaderMobile = document.querySelector('.top-page-inner');

                        if (btn.classList.contains('_active')) {
                            _slideDown(container, 300);

                            const topGap = window.pageYOffset + container.getBoundingClientRect().top;
                            if (window.innerWidth >= 1112) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            }

                        } else {
                            _slideUp(container, 300);
                            const topGap = window.pageYOffset + btn.closest('.layouts__item').querySelector('.layouts__item-btn').getBoundingClientRect().top;
                            if (window.innerWidth >= 1112) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight : topGap,
                                    behavior: 'smooth',
                                })
                            }
                        }
                    });
                })
            }
        })
    }
    if (document.querySelector('.object-slider-two')) {
        const sliders = document.querySelectorAll('.object-slider-two');
        sliders.forEach(el => {
            const slider = el.querySelector('.object-slider-body__wrapper');
            new Swiper(slider, {
                observer: true,
                observeParents: true,
                slidesPerView: 1,
                spaceBetween: 16,
                navigation: {
                    prevEl: el.querySelector('.nav-arrow-primary--prev'),
                    nextEl: el.querySelector('.nav-arrow-primary--next'),
                },
                pagination: {
                    el: el.querySelector('.pagination-primary'),
                    type: 'fraction',
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
