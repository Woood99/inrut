import '../vendor/dragscroll';
import {
    _slideDown,
    _slideUp
} from '../support-modules/slide'
const mapMetro = () => {
    const container = document.querySelector('.search-area__form');
    if (!container) return;
    const map = container.querySelector('.map-metro');

    metroHovered();
    reziseContainer();
    scaleMap();
    activationCheckbox();
    activationAndClearAll();

    function activationAndClearAll() {
        const items = container.querySelectorAll('.search-area__item');
        items.forEach(item => {
            const elements = item.querySelectorAll('[data-metro-id]');
            const btnAll = item.querySelector('.search-area__control');
            const btnClear = item.querySelector('.search-area__control:nth-child(2)');

            btnAll.addEventListener('click', () => {
                elements.forEach(el => {
                    el.querySelector('.checkbox-secondary__input').checked = true;
                    const currentId = el.dataset.metroId;
                    const stationName = map.querySelector(`[data-map-metro-id='${currentId}']`);
                    if (stationName) {
                        const stationCircle = map.querySelector(`.MetroMap_to_${stationName.id.replace('MetroMap_station_','')}`)
                        stationName.classList.add('MetroMap_select');
                        stationCircle.classList.add('MetroMap_select');
                    }


                    const currentIdItems = container.querySelectorAll(`[data-metro-id='${currentId}']`);
                    if (currentIdItems.length > 1) {
                        currentIdItems.forEach(item => {
                            if (item !== el) {
                                item.querySelector('.checkbox-secondary__input').checked = true;
                            }
                        })
                    }
                })
            })
            btnClear.addEventListener('click', () => {
                elements.forEach(el => {
                    el.querySelector('.checkbox-secondary__input').checked = false;
                    const currentId = el.dataset.metroId;
                    const stationName = map.querySelector(`[data-map-metro-id='${currentId}']`);
                    if (stationName) {
                        const stationCircle = map.querySelector(`.MetroMap_to_${stationName.id.replace('MetroMap_station_','')}`)
                        stationName.classList.remove('MetroMap_select');
                        stationCircle.classList.remove('MetroMap_select');
                    }


                    const currentIdItems = container.querySelectorAll(`[data-metro-id='${currentId}']`);
                    if (currentIdItems.length > 1) {
                        currentIdItems.forEach(item => {
                            if (item !== el) {
                                item.querySelector('.checkbox-secondary__input').checked = false;
                            }
                        })
                    }
                })
            })
        })
    }

    function activationCheckbox() {
        const elementList = container.querySelectorAll('[data-metro-id]');
        elementList.forEach(element => {
            const checkbox = element.querySelector('.checkbox-secondary__input');
            checkbox.addEventListener('change', () => {
                const currentId = element.dataset.metroId;
                const currentElementMap = map.querySelector(`[data-map-metro-id='${currentId}']`);
                if (!currentElementMap) return;
                const circle = container.querySelector(`.MetroMap_to_${currentElementMap.id.replace('MetroMap_station_','')}`);
                const inputs = container.querySelectorAll(`[data-metro-id='${currentId}'] .checkbox-secondary__input`);
                if (checkbox.checked) {
                    circle.classList.add('MetroMap_select');
                    currentElementMap.classList.add('MetroMap_select');
                    inputs.forEach(input => {
                        if (input.checked === false) {
                            input.checked = true;
                        }
                    })
                } else {
                    currentElementMap.classList.remove('MetroMap_select');
                    circle.classList.remove('MetroMap_select');
                    inputs.forEach(input => {
                        if (input.checked) {
                            input.checked = false;
                        }
                    })
                }
            });
        })

        map.addEventListener('click', (e) => {
            if (map.closest('.dragscroll').classList.contains('is-moving')) return;
            const target = e.target;
            const stationItem = target.closest('.MetroMap_station_item');
            const circleItem = target.closest('.MetroMap_stop');
            // if (stationItem) {
            //     const stationId = stationItem.id.replace('MetroMap_station_', '');
            //     const circle = map.querySelector(`.MetroMap_to_${stationId}`);
            //     const currentId = stationItem.dataset.mapMetroId;
            //     const currentElementList = container.querySelectorAll(`[data-metro-id='${currentId}']`);
            //     if (!stationItem.classList.contains('MetroMap_select')) {
            //         stationItem.classList.add('MetroMap_select');
            //         stationItem.classList.remove('MetroMap_hovered');

            //         circle.classList.add('MetroMap_select');
            //         circle.classList.remove('MetroMap_hovered');

            //         if (currentElementList.length === 0) return;
            //         currentElementList.forEach(item => {
            //             item.querySelector('.checkbox-secondary__input').checked = true;
            //         })

            //         openSpoller(currentElementList,?);
            //     } else {
            //         stationItem.classList.remove('MetroMap_select');

            //         circle.classList.remove('MetroMap_select');

            //         if (currentElementList.length === 0) return;
            //         currentElementList.forEach(item => {
            //             item.querySelector('.checkbox-secondary__input').checked = false;
            //         })
            //     }
            // }

            if (circleItem) {
                if (circleItem.closest('.MetroMap_transit_group')) {
                    let item = circleItem.closest('.MetroMap_transit_group');
                    const stationId = item.getAttribute('class').replace('MetroMap_transit_group ', '').replace('MetroMap_to_', '').replace('MetroMap_hovered', '').replace('MetroMap_select', '').trim();

                    const station = map.querySelector(`#MetroMap_station_${stationId}`);
                    const currentId = station.dataset.mapMetroId;
                    const currentElementList = container.querySelectorAll(`[data-metro-id='${currentId}']`);
                    if (!item.classList.contains('MetroMap_select')) {
                        station.classList.add('MetroMap_select');
                        station.classList.remove('MetroMap_hovered');

                        item.classList.add('MetroMap_select');
                        item.classList.remove('MetroMap_hovered');
                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = true;
                        })

                        openSpoller(currentElementList, circleItem);
                    } else {
                        station.classList.remove('MetroMap_select');
                        item.classList.remove('MetroMap_select');

                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = false;
                        })

                    }
                } else {
                    const stationId = circleItem.getAttribute('class').replace('MetroMap_stop', '').replace('MetroMap_to_', '').replace('MetroMap_hovered', '').replace('MetroMap_select', '').trim();
                    const station = map.querySelector(`#MetroMap_station_${stationId}`);

                    const currentId = station.dataset.mapMetroId;
                    const currentElementList = container.querySelectorAll(`[data-metro-id='${currentId}']`);

                    if (!circleItem.classList.contains('MetroMap_select')) {
                        circleItem.classList.add('MetroMap_select');
                        circleItem.classList.remove('MetroMap_hovered');

                        station.classList.add('MetroMap_select');
                        station.classList.remove('MetroMap_hovered');

                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = true;
                        })

                        openSpoller(currentElementList, circleItem);
                    } else {
                        circleItem.classList.remove('MetroMap_select');

                        station.classList.remove('MetroMap_select');

                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = false;
                        })
                    }
                }
            }
        })

    }

    function openSpoller(target, currentElem) {
        const spollers = container.querySelectorAll('.search-area__item');
        const currentColor = window.getComputedStyle(currentElem.querySelector('.MetroMap_circle')).fill;
        spollers.forEach(spoller => {
            const btn = spoller.querySelector('.spollers__title');
            const body = spoller.querySelector('.spollers__body');
            if (btn.classList.contains('_spoller-active')) {
                const colorSpoller = window.getComputedStyle(spoller.querySelector('div svg')).fill;
                if (currentColor === colorSpoller) return;
                btn.classList.remove('_spoller-active');
                _slideUp(body, 0);
            }
        })
        if (target.length === 1) {
            slideDownAndMoving(target[0]);
        } else {
            target.forEach(el => {
                const colorSpoller = window.getComputedStyle(el.querySelector('.checkbox-secondary__circle')).backgroundColor;
                if (currentColor === colorSpoller) slideDownAndMoving(el);
            })
        }

        function slideDownAndMoving(target) {
            const spoller = target.closest('.search-area__item');
            const btn = spoller.querySelector('.spollers__title');
            const body = spoller.querySelector('.spollers__body');
            if (!btn.classList.contains('_spoller-active')) {
                btn.classList.add('_spoller-active');
                _slideDown(body, 0);
            }
            setTimeout(() => {
                const topGap = target.offsetTop;
                target.closest('.popup-primary--search-area').scrollTo({
                    top: topGap - 100,
                    behavior: 'smooth',
                });
            }, 0);
        }
    }

    function metroHovered() {
        map.addEventListener('mousemove', (e) => {
            const target = e.target;
            // if (target.closest('.MetroMap_station_item')) {
            //     const item = target.closest('.MetroMap_station_item');
            //     if (item.classList.contains('MetroMap_select')) return;
            //     const idStation = item.id.replace('MetroMap_station_', '');
            //     const circleItems = document.querySelectorAll(`.MetroMap_to_${idStation}`);
            //     item.classList.add('MetroMap_hovered')
            //     circleItems.forEach(circle => circle.classList.add('MetroMap_hovered'))
            // } else if (target.closest('.MetroMap_transit_group')) {
            //     const item = target.closest('.MetroMap_transit_group');
            //     if (item.classList.contains('MetroMap_select')) return;
            //     const idItem = item.getAttribute('class').replace('MetroMap_transit_group', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
            //     document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
            //     item.classList.add('MetroMap_hovered');
            // } else if (target.closest('.MetroMap_stop')) {
            //     const item = target.closest('.MetroMap_stop');
            //     if (item.classList.contains('MetroMap_select')) return;
            //     const idItem = item.getAttribute('class').replace('MetroMap_stop', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
            //     document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
            //     item.classList.add('MetroMap_hovered');
            // } else {
            //     const items = map.querySelectorAll('.MetroMap_hovered');
            //     if (items.length === 0) return;
            //     items.forEach(item => item.classList.remove('MetroMap_hovered'));
            // }


            if (target.closest('.MetroMap_transit_group')) {
                const item = target.closest('.MetroMap_transit_group');
                if (item.classList.contains('MetroMap_select')) return;
                const idItem = item.getAttribute('class').replace('MetroMap_transit_group', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
                document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
                item.classList.add('MetroMap_hovered');
            } else if (target.closest('.MetroMap_stop')) {
                const item = target.closest('.MetroMap_stop');
                if (item.classList.contains('MetroMap_select')) return;
                const idItem = item.getAttribute('class').replace('MetroMap_stop', '').replace('MetroMap_hovered', '').replace('MetroMap_to_', '').trim();
                document.getElementById(`MetroMap_station_${idItem}`).classList.add('MetroMap_hovered');
                item.classList.add('MetroMap_hovered');
            } else {
                const items = map.querySelectorAll('.MetroMap_hovered');
                if (items.length === 0) return;
                items.forEach(item => item.classList.remove('MetroMap_hovered'));
            }
        });
    }

    function reziseContainer() {
        const btnResize = container.querySelector('.search-area__resize');
        btnResize.addEventListener('mousedown', function (e) {
            e.preventDefault()
            window.addEventListener('mousemove', resize)
            window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
            const width = e.pageX - container.getBoundingClientRect().left - 20;
            if (!(width <= 750 && width >= 345)) return;
            container.style.gridTemplateColumns = `${width}px 1fr`;
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
                map.attachEvent("onmousewheel", handler);
            }
        }

        let scale = 0.9;
        const maxScale = 1.15;
        const minScale = 0.5;
        const stap = 0.05;
        addOnWheel(map, function (e) {

            let delta = e.deltaY || e.detail || e.wheelDelta;

            if (delta === 100) {
                if (scale > minScale) scale -= stap;
                if (scale < minScale) scale = minScale;
            }
            if (delta === -100) {
                if (scale < maxScale) scale += stap;
                if (scale > maxScale) scale = maxScale;
            }

            map.querySelector('#map-metro_moscow').style.transform = map.style.WebkitTransform = map.style.MsTransform = 'scale(' + scale + ')';
            e.preventDefault();
        });
    }

};

export default mapMetro;
