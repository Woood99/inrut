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
        function init() {
            let map = new ymaps.Map('object-maps', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#object-maps');
        }
        ymaps.ready(init);
    }
    if (document.querySelector('#submit-app-map')) {
        function init() {
            let map = new ymaps.Map('submit-app-map', {
                center: [55.77171185651524, 37.62811179984117],
                zoom: 10,
            });
            removeControlsPrimary(map, '#submit-app-map');
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
};

export default maps;
