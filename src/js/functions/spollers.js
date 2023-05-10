import dataMediaQueries from '../support-modules/dataMediaQueries';
import {
    _slideUp,
    _slideDown,
    _slideToggle
} from '../support-modules/slide';

const spollers = () => {
    const spollersArray = document.querySelectorAll('[data-spollers]');
    let speed = 500;
    if (spollersArray.length > 0) {
        // Получение обычных слойлеров
        const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
            return !item.dataset.spollers.split(",")[0];
        });
        // Инициализация обычных слойлеров
        if (spollersRegular.length) {
            initSpollers(spollersRegular);
        }
        // Получение слойлеров с медиа запросами
        let mdQueriesArray = dataMediaQueries(spollersArray, "spollers");
        if (mdQueriesArray && mdQueriesArray.length) {
            mdQueriesArray.forEach(mdQueriesItem => {
                // Событие
                mdQueriesItem.matchMedia.addEventListener("change", function () {
                    initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
                });
                initSpollers(mdQueriesItem.itemsArray, mdQueriesItem.matchMedia);
            });
        }

        // Инициализация
        function initSpollers(spollersArray, matchMedia = false) {
            spollersArray.forEach(spollersBlock => {
                spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
                if (matchMedia.matches || !matchMedia) {
                    spollersBlock.classList.add('_spoller-init');
                    initSpollerBody(spollersBlock);
                    spollersBlock.addEventListener("click", setSpollerAction);
                } else {
                    spollersBlock.classList.remove('_spoller-init');
                    initSpollerBody(spollersBlock, false);
                    spollersBlock.removeEventListener("click", setSpollerAction);
                }
            });
        }
        // Работа с контентом
        function initSpollerBody(spollersBlock, hideSpollerBody = true) {
            let spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
            if (spollerTitles.length) {
                spollerTitles = Array.from(spollerTitles).filter(item => item.closest('[data-spollers]') === spollersBlock);
                spollerTitles.forEach(spollerTitle => {
                    if (hideSpollerBody) {
                        spollerTitle.removeAttribute('tabindex');
                        if (!spollerTitle.classList.contains('_spoller-active')) {
                            spollerTitle.nextElementSibling.hidden = true;
                        }
                    } else {
                        spollerTitle.setAttribute('tabindex', '-1');
                        spollerTitle.nextElementSibling.hidden = false;
                    }
                });
            }
        }

        function setSpollerAction(e) {
            const el = e.target;
            if (el.closest('[data-spoller]')) {
                const spollerTitle = el.closest('[data-spoller]');
                const spollersBlock = spollerTitle.closest('[data-spollers]');
                const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;

                if (!spollersBlock.querySelectorAll('._slide').length) {


                    if (oneSpoller && !spollerTitle.classList.contains('_spoller-active')) {
                        hideSpollersBody(spollersBlock);
                    }
                    spollerTitle.classList.toggle('_spoller-active');

                    if (el.closest('.layouts__item-btn')) speed = 200;

                    _slideToggle(spollerTitle.nextElementSibling, speed);

                    if (spollerTitle.classList.contains('_spoller-active') && el.closest('.layouts__item-btn')) {

                        setTimeout(() => {
                            const headerFixed = document.querySelector('.header-fixed');
                            const topHeaderMobile = document.querySelector('.top-page-inner');
                            const topGap = window.pageYOffset + spollerTitle.getBoundingClientRect().top
                            if (window.innerWidth >= 1112) {
                                window.scrollTo({
                                    top: headerFixed ? topGap - headerFixed.offsetHeight - 16 : topGap - 16,
                                    behavior: 'smooth',
                                })
                            } else {
                                window.scrollTo({
                                    top: topHeaderMobile ? topGap - topHeaderMobile.offsetHeight - 16 : topGap - 16,
                                    behavior: 'smooth',
                                })
                            }
                        }, speed);

                    }
                }
                e.preventDefault();
            }
        }

        function hideSpollersBody(spollersBlock) {
            const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._spoller-active');
            if (spollerActiveTitle) {
                console.log(speed);
                spollerActiveTitle.classList.remove('_spoller-active');
                _slideUp(spollerActiveTitle.nextElementSibling, speed);
            }
        }
    }
}

export default spollers;
