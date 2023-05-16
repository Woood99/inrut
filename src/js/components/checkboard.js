import modal from '../modules/modal';

const checkboard = () => {
    const container = document.querySelector('.checkboard');
    if (!container) return;
    const items = container.querySelectorAll('.checkboard__item--free');
    if (items.length === 0) return;
    const innerWidth = 1112;
    if (window.innerWidth >= innerWidth) {
        items.forEach(item => {
            item.addEventListener('mouseover', () => item.classList.add('_active'));
            item.addEventListener('mouseout', () => item.classList.remove('_active'));
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
                    <button class="btn-reset checkboard-popup-card__close" aria-label="Закрыть модальное окно">
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

    function checkboardNav() {
        const container = document.querySelector('.popup-primary--checkboard');
        const checkboard = document.querySelector('.checkboard');
        const navPrev = checkboard.querySelector('.checkboard__prev');
        const navNext = checkboard.querySelector('.checkboard__next');
        const navBottom = checkboard.querySelector('.checkboard__go-bottom');
        const navTop = checkboard.querySelector('.checkboard__go-top');

        container.addEventListener('scroll', () => {
            if (window.innerWidth <= innerWidth) return;
            const topGap = checkboard.getBoundingClientRect().top;
            if (topGap <= 0) {
                navPrev.classList.add('_active');
                navNext.classList.add('_active');
            } else {
                navPrev.classList.remove('_active');
                navNext.classList.remove('_active');
            }

            console.log(container.scrollHeight);
            console.log(container.scrollTop + container.clientHeight);
            if (container.scrollHeight === container.scrollTop + container.clientHeight || container.scrollHeight - 1 <= container.scrollTop + container.clientHeight) {
                navBottom.setAttribute('hidden', '');
                navTop.removeAttribute('hidden');
            } else {
                navTop.setAttribute('hidden', '');
                navBottom.removeAttribute('hidden');
            }
            // if ((container.scrollHeight - container.scrollTop) === window.innerHeight) {
            //     navBottom.setAttribute('hidden', '');
            //     navTop.removeAttribute('hidden');
            // } else {
            //     navTop.setAttribute('hidden', '');
            //     navBottom.removeAttribute('hidden');
            // }
        })

        navTop.addEventListener('click', () => {
            container.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        })
        navBottom.addEventListener('click', () => {
            container.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth',
            });
        })

        setTimeout(() => {
            const containerSimplebar = checkboard.querySelector('.simplebar-content-wrapper');
            navPrev.addEventListener('click', () => {
                containerSimplebar.scrollTo({
                    left: containerSimplebar.scrollRight + 200,
                    behavior: 'smooth',
                })
            });
            navNext.addEventListener('click', () => {
                containerSimplebar.scrollTo({
                    left: containerSimplebar.scrollLeft + 200,
                    behavior: 'smooth',
                })
            });
        }, 500);

    }


    checkboardNav();
};

export default checkboard;
