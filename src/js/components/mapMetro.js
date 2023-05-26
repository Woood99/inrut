import '../components/dragscroll'
const mapMetro = () => {
    const container = document.querySelector('.map-metro');
    if (!container) return;
    container.addEventListener('mousemove', (e) => {
        const target = e.target;
        if (target.closest('.MetroMap_station_item')) {
            const item = target.closest('.MetroMap_station_item');
            const idStation = item.id.replace('MetroMap_station_', '');
            const circleItems = document.querySelectorAll(`.MetroMap_to_${idStation}`);
            item.classList.add('MetroMap_hovered')
            circleItems.forEach(circle => circle.classList.add('MetroMap_hovered'))
        } else if (target.closest('.MetroMap_transit_group')) {
            const item = target.closest('.MetroMap_transit_group');
            const idItem = item.getAttribute('class').replace('MetroMap_transit_group', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
            document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
            item.querySelectorAll('.MetroMap_stop').forEach(el => el.classList.add('MetroMap_hovered'));
        } else if (target.closest('.MetroMap_stop')) {
            const item = target.closest('.MetroMap_stop');
            const idItem = item.getAttribute('class').replace('MetroMap_stop', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
            document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
            item.classList.add('MetroMap_hovered');
        } else {
            removeAllHovered();
        }
    });

    function removeAllHovered() {
        const items = container.querySelectorAll('.MetroMap_hovered');
        if (items.length === 0) return;
        items.forEach(item => item.classList.remove('MetroMap_hovered'));
    }



    reziseContainer();
    scaleMap();


    function reziseContainer() {
        const containerResize = document.querySelector('.search-area__form');
        const btnResize = document.querySelector('.search-area__resize');
        btnResize.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            const width = e.pageX - containerResize.getBoundingClientRect().left - 20;
            if (!(width <= 750 && width >= 345)) return;
            containerResize.style.gridTemplateColumns = `${width}px 1fr`;
        }

        function stopResize() {
            window.removeEventListener('mousemove', resize)
        }
    }

    function scaleMap() {
        function addOnWheel(elem, handler) {
            if (elem.addEventListener) {
                if ('onwheel' in document) {
                    elem.addEventListener("wheel", handler);
                } else if ('onmousewheel' in document) {
                    elem.addEventListener("mousewheel", handler);
                } else {
                    elem.addEventListener("MozMousePixelScroll", handler);
                }
            } else {
                container.attachEvent("onmousewheel", handler);
            }
        }

        let scale = 0.9;
        const maxScale = 1.15;
        const minScale = 0.5;
        const stap = 0.05;
        addOnWheel(container, function (e) {

            let delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta === 100) {
                if (scale > minScale) scale -= stap;
                if (scale < minScale) scale = minScale;
            }
            if (delta === -100) {
                if (scale < maxScale) scale += stap;
                if (scale > maxScale) scale = maxScale;
            }

            container.querySelector('#map-metro_moscow').style.transform = container.style.WebkitTransform = container.style.MsTransform = 'scale(' + scale + ')';
            e.preventDefault();
        });
    }

};

export default mapMetro;
