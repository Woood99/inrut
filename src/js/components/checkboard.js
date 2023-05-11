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
                <div class="checkboard-popup">
                <div class="checkboard-popup__container">
                    <button class="btn-reset js-popup-close checkboard-popup__close" aria-label="Закрыть модальное окно">
                        <svg>
                            <use xlink:href="img/sprite.svg#x"></use>
                        </svg>
                        <span>Закрыть</span>
                    </button>
                     <div class="checkboard-popup__content">
                        <article class="card-scheme">
                            <div class="card-scheme__container">
                                    ${cardContainer.innerHTML}
                            </div>
                        </article>
                        <a href="${href}" class="btn btn-reset btn-primary checkboard-popup__link">Перейти на страницу квартиры</a>
                     </div>
                </div>
                </div>
                `;

                modal(modalHTML, '.checkboard-popup', 300);
            });
        });
    }
};

checkboard();
