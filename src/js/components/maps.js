const maps = () => {
    function removeControlsPrimary(map, containerSelector) {
        map.controls.remove('geolocationControl'); // удаляем геолокацию
        map.controls.remove('searchControl'); // удаляем поиск
        map.controls.remove('trafficControl'); // удаляем контроль трафика
        map.controls.remove('typeSelector'); // удаляем тип
        map.controls.remove('rulerControl'); // удаляем контрол правил
        map.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    }
    if (document.querySelector('#bid-maps')) {
        function init() {
            let map = new ymaps.Map('bid-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#bid-maps');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#object-maps')) {
        const objectMaps = document.querySelector('#object-maps');
        if (!objectMaps) return;

        function init() {
            let map = new ymaps.Map('object-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });

            removeControlsPrimary(map, '#object-maps');
            const containerSelects = objectMaps.closest('.object-location--select');
            if (containerSelects) {
                const btns = containerSelects.querySelectorAll('.object-location__btn');
                const infrastructure = containerSelects.querySelector('.object-location__infrastructure');
                const routes = containerSelects.querySelector('.object-location__routes');
                const locationRoutesBtn = document.querySelector('.location-routes__btn');
                btns.forEach(btn => {
                    btn.addEventListener('click', () => {
                        btns.forEach(btn => btn.classList.remove('_active'));
                        btn.classList.toggle('_active');
                        if (btn.classList.contains('object-location__btn--infrastructure')) {
                            infrastructure.classList.add('_active');
                            objectMaps.classList.remove('_routes');
                            routes.classList.remove('_active');
                            locationRoutesBtn.classList.remove('_active');
                            routeHidden();
                        } else if (btn.classList.contains('object-location__btn--routes')) {
                            objectMaps.classList.add('_routes');
                            routes.classList.add('_active');
                            infrastructure.classList.remove('_active');
                        } else {
                            objectMaps.classList.remove('_routes');
                            infrastructure.classList.remove('_active');
                            routes.classList.remove('_active');
                            locationRoutesBtn.classList.remove('_active');
                            routeHidden();
                        }
                    });
                })
                locationRoutesBtn.addEventListener('click', () => {
                    if (!locationRoutesBtn.classList.contains('_active')) {
                        locationRoutesBtn.classList.add('_active');
                        routes.classList.add('_show');
                        routeShow();
                        // console.log(map.controls.get('routePanelControl'));
                    } else {
                        locationRoutesBtn.classList.remove('_active');
                        routes.classList.remove('_show');
                        routeHidden();
                    }
                });

                const fullScreenControl = map.controls.get('fullscreenControl');
                fullScreenControl.events.add('fullscreenenter', function () {
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    fullscreenElement.classList.add('yandex-map-active-fullscreen');
                    map.behaviors.enable(['scrollZoom']);
                    if (infrastructure.classList.contains('_active')) {
                        fullscreenElement.insertAdjacentElement('beforeend', infrastructure);
                        infrastructure.classList.add('_active-fullscreen');
                    }
                    if (routes.classList.contains('_active')) {
                        fullscreenElement.insertAdjacentElement('beforeend', routes);
                        routes.classList.add('_active-fullscreen');
                    }
                });

                fullScreenControl.events.add('fullscreenexit', function () {
                    const fullscreenElement = fullScreenControl.getMap().container._fullscreenManager._element;
                    if (infrastructure.classList.contains('_active')) {
                        objectMaps.closest('.object-location__maps').insertAdjacentElement('afterend', infrastructure);
                        infrastructure.classList.remove('_active-fullscreen');
                    }
                    if (routes.classList.contains('_active')) {
                        routes.classList.remove('_active-fullscreen');
                    }
                    fullscreenElement.classList.remove('yandex-map-active-fullscreen');
                    map.behaviors.disable(['scrollZoom']);
                });

                function routeShow() {
                    map.controls.add('routePanelControl', {
                        showHeader: true,
                        title: 'Построить маршрут',
                        float: 'right',
                        maxWidth: '320px',
                        position: {
                            right: 0,
                            top: 0,
                        }
                    });
                }

                function routeHidden() {
                    map.controls.remove('routePanelControl');
                }
            }
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#map-draw')) {
        function init() {
            let map = new ymaps.Map('map-draw', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#map-draw');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#place-sale-address-map')) {
        function init() {
            let map = new ymaps.Map('place-sale-address-map', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#place-sale-address-map');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#popup-map__map')) {
        const container = document.querySelector('.popup-map__container');
        if (!container) return;

        function init() {
            let map = new ymaps.Map('popup-map__map', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#popup-map__map');
            if (innerWidth > 1144) reziseContainer(map)
        }
        ymaps.ready(init);

        const btn = container.querySelector('.popup-map__resize');

        function reziseContainer(map) {

            btn.addEventListener('mousedown', function (e) {
                e.preventDefault()
                window.addEventListener('mousemove', resize)
                window.addEventListener('mouseup', stopResize)
            })

            function resize(e) {
                const width = e.pageX - container.getBoundingClientRect().left - 20;
                if (!(width <= 706 && width >= 345)) return;
                container.style.gridTemplateColumns = `${width}px 1fr`;
                map.container.fitToViewport();
            }

            function stopResize() {
                window.removeEventListener('mousemove', resize)
            }
        }

        const cardFull = container.querySelector('.popup-map__card-full');
        container.addEventListener('click', (e) => {
            const target = e.target;
            const card = target.closest('[data-card-full-page-src]')
            if (card) {
                e.preventDefault();
                cardFull.classList.add('_active');
                cardFull.setAttribute('src', card.dataset.cardFullPageSrc);

                container.querySelector('.popup-map__items').setAttribute('hidden', '');

                setTimeout(() => {
                    const pageBody = (cardFull.contentDocument || cardFull.contentWindow.document).querySelector('.page__body');
                    cardFull.style.height = `${pageBody.clientHeight + 50}px`;
                    cardFull.removeAttribute('scrolling');
                    pageBody.querySelector('.object__back').addEventListener('click', () => {
                        closeCardFull();
                    })
                }, 1500);

                function closeCardFull() {
                    cardFull.classList.remove('_active');
                    cardFull.setAttribute('src', '');
                    container.querySelector('.popup-map__items').removeAttribute('hidden');
                }
            }
        })

    }
};

export default maps;
