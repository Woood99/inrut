import modal from '../modules/modal';

const checkboard = () => {
    const container = document.querySelector('.checkboard');
    if (!container) return;
    const items = container.querySelectorAll('.checkboard__item--free');
    if (items.length === 0) return;
    const innerWidth = 1112;
    if (window.innerWidth >= innerWidth) {
        items.forEach(item => {
            item.addEventListener('mouseover', () => {
                // container.classList.add('_active');
                item.classList.add('_active');
            });
            item.addEventListener('mouseout', () => {
                // container.classList.remove('_active');
                item.classList.remove('_active');
            });
        });
    }
    if (window.innerWidth < innerWidth) {
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const cardContainer = item.querySelector('.checkboard__card').querySelector('.card-scheme__container');
                const href = item.querySelector('.checkboard__link').getAttribute('href');
                const modalHTML = `
                <div class="checkboard-popup-card">
                <div class="checkboard-popup-card__container">
                    <button class="btn-reset js-popup-close checkboard-popup-card__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="checkboard-popup-card__content">
                        <article class="card-scheme">
                            <div class="card-scheme__container">
                                    ${cardContainer.innerHTML}
                            </div>
                        </article>
                        <a href="${href}" class="btn btn-reset btn-primary checkboard-popup-card__link">Перейти на страницу квартиры</a>
                     </div>
                </div>
                </div>
                `;

                modal(modalHTML, '.checkboard-popup-card', 300);
            });
        });
    }


    function checkboardScroll() {
        const container = document.querySelector('.popup-primary--checkboard');
        const checkboard = document.querySelector('.checkboard');
        const nav = checkboard.querySelectorAll('.checkboard__nav');
        container.addEventListener('scroll', () => {
            if (window.innerWidth <= innerWidth) return;
            const topGap = checkboard.getBoundingClientRect().top;
            if (topGap <= 0) {
                nav.forEach(arrow => arrow.classList.add('_active'));
            } else {
                nav.forEach(arrow => arrow.classList.remove('_active'));
            }
        })
    };

    function checkboardNav() {
        const checkboard = document.querySelector('.checkboard');
        const navPrev = checkboard.querySelector('.checkboard__prev');
        const navNext = checkboard.querySelector('.checkboard__next');
        const container = checkboard.querySelector('.simplebar-content-wrapper');
        navPrev.addEventListener('click', () => {
            container.scrollTo({
                left: container.scrollRight + 200,
                behavior: 'smooth',
            })
        });
        navNext.addEventListener('click', () => {
            container.scrollTo({
                left: container.scrollLeft + 200,
                behavior: 'smooth',
            })
        });
    }



    checkboardScroll();
    setTimeout(() => {
        checkboardNav();
    }, 500);
};

checkboard();
