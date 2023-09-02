import Swiper, {
    Navigation,
    Pagination,
} from 'swiper';
Swiper.use([Navigation, Pagination]);


export const cardSecondaryActions = () => {
    const cards = document.querySelectorAll('.card-secondary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-secondary__item');
        const imagePagination = card.querySelector('.card-secondary__pagination');
        cardImageSwitch(card, imageSwitchItems, imagePagination);
        cardSliderMobile(card.querySelector('.card-secondary__top'), card.querySelector('.card-secondary__images'), card.querySelectorAll('.card-secondary__item'));
        card.addEventListener('click', (e) => {
            const favorite = e.target.closest('.card-secondary__info--favorite');
            if (favorite && !(favorite.dataset.popupPath && favorite.dataset.popupPath === 'favorite-two')) {
                e.preventDefault();
                card.querySelectorAll('.card-secondary__info--favorite').forEach(el => {
                    if (!el.classList.contains('_active')) {
                        el.classList.add('_active');
                        el.setAttribute('title', 'Удалить с избранного');
                    } else {
                        el.classList.remove('_active');
                        el.setAttribute('title', 'Добавить в избранное');
                    }
                });
            }
        })

    })

    favoriteMobile();
    window.addEventListener('resize', favoriteMobile);

    function favoriteMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1024) {
                const favorite = card.querySelector('.card-secondary__info--favorite');
                const path = card.querySelector('.card-secondary__content');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            } else {
                const favorite = card.querySelector('.card-secondary__info--favorite');
                const path = card.querySelector('.card-secondary__info--btns-right');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            }
        })
    }
};
export const cardPrimaryActions = () => {
    const cards = document.querySelectorAll('.card-primary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-primary__item');
        const imagePagination = card.querySelector('.card-primary__pagination');
        cardImageSwitch(card, imageSwitchItems, imagePagination);
        cardSliderMobile(card.querySelector('.card-primary__top'), card.querySelector('.card-primary__images'), card.querySelectorAll('.card-primary__item'));
        card.addEventListener('click', (e) => {
            const favorite = e.target.closest('.card-primary__info--favorite');
            if (favorite && !(favorite.dataset.popupPath && favorite.dataset.popupPath === 'favorite-two')) {
                e.preventDefault();
                card.querySelectorAll('.card-primary__info--favorite').forEach(el => {
                    if (!el.classList.contains('_active')) {
                        el.classList.add('_active');
                        el.setAttribute('title', 'Удалить с избранного');
                    } else {
                        el.classList.remove('_active');
                        el.setAttribute('title', 'Добавить в избранное');
                    }
                });
            }
        })
    })

    favoriteMobile();
    window.addEventListener('resize', favoriteMobile);

    function favoriteMobile() {
        cards.forEach(card => {
            if (window.innerWidth <= 1024) {
                const favorite = card.querySelector('.card-primary__info--favorite');
                const path = card.querySelector('.card-primary__content');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            } else {
                const favorite = card.querySelector('.card-primary__info--favorite');
                const path = card.querySelector('.card-primary__info--btns-right');
                if (favorite && path) {
                    path.insertAdjacentElement('afterbegin', favorite);
                }
            }
        })
    }
};



function cardImageSwitch(card, imageSwitchItems, imagePagination) {
    if (window.innerWidth <= 1024) return;
    if (imageSwitchItems.length <= 1) return;
    imageSwitchItems.forEach((el, index) => {
        el.setAttribute('data-index', index);
        imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
        el.addEventListener('mouseenter', (e) => {
            if (window.innerWidth > 1024) {
                card.querySelectorAll('.image-pagination__item').forEach(el => {
                    el.classList.remove('image-pagination__item--active')
                });
                card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
            }
        });

        el.addEventListener('mouseleave', (e) => {
            if (window.innerWidth > 1024) {
                card.querySelectorAll('.image-pagination__item').forEach(el => {
                    el.classList.remove('image-pagination__item--active')
                });
                card.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
            }
        });
    });
}

function cardSliderMobile(cardImageWrapper, imagesBody, cardItems) {
    let slider;
    body();
    window.addEventListener('resize', body);

    function body() {
        if (window.innerWidth <= 1024) {
            if (!cardImageWrapper.classList.contains('swiper-initialized')) {
                cardImageWrapper.classList.add('swiper');
                imagesBody.classList.add('swiper-wrapper');
                cardItems.forEach(item => item.classList.add('swiper-slide'));

                slider = new Swiper(cardImageWrapper, {
                    observer: true,
                    observeParents: true,
                    autoHeight: true,
                    slidesPerView: 1.12,
                    spaceBetween: 8,
                    speed: 800,
                    breakpoints: {
                        768: {
                            slidesPerView: 1,
                        },
                    },
                });
            }
        } else {
            if (cardImageWrapper.classList.contains('swiper-initialized')) {
                slider.destroy();
                cardImageWrapper.classList.remove('swiper');
                imagesBody.classList.remove('swiper-wrapper');
                cardItems.forEach(item => item.classList.remove('swiper-slide'));
            }
        }
    }
}
