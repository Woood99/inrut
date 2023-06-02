import '../vendor/dragscroll';
import {
    _slideDown,
    _slideUp
} from '../support-modules/slide'
const mapMetro = () => {
    const container = document.querySelector('.search-area__form');
    if (!container) return;
    const map = container.querySelector('.map-metro');
    const clearAllBtn = container.querySelector('.search-area__clear');
    metroHovered();
    reziseContainer();
    scaleMap();
    activationCheckbox();
    activationAndClearAll();
    navBottomCloseItem();
    navBottomMoreItem();

    const moscowMetroItems = {};
    container.querySelectorAll('.search-area__item').forEach(item => {
        moscowMetroItems[item.dataset.searchAreaMetro] = Array.from(item.querySelectorAll('[data-metro-id]'));
    })

    function activationAndClearAll() {
        const items = container.querySelectorAll('.search-area__item');
        items.forEach(item => {
            const elements = item.querySelectorAll('[data-metro-id]');
            const btnAll = item.querySelector('.search-area__control');
            const btnClear = item.querySelector('.search-area__control:nth-child(2)');

            btnAll.addEventListener('click', () => {
                clearAllLine(elements);
                navBottomUpdate(item.dataset.searchAreaMetro);
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
                navBottomUpdate();
            })
        })
    }

    function clearAllLine(elements) {
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
    }

    function clearAll() {
        container.querySelectorAll('.checkbox-secondary__input').forEach(input => input.checked = false);
        container.querySelectorAll('.MetroMap_select').forEach(el => el.classList.remove('MetroMap_select'))
        navBottomUpdate();
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

                        reindexingArrayMetro(input.closest('[data-metro-id]'))

                        navBottomUpdate(element.closest('.search-area__item').dataset.searchAreaMetro);
                    })
                } else {
                    currentElementMap.classList.remove('MetroMap_select');
                    circle.classList.remove('MetroMap_select');
                    inputs.forEach(input => {
                        if (input.checked) {
                            input.checked = false;
                        }
                    })
                    navBottomUpdate();
                }
            });
        })

        map.addEventListener('click', (e) => {
            if (map.closest('.dragscroll').classList.contains('is-moving')) return;
            const target = e.target;
            const circleItem = target.closest('.MetroMap_stop');

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
                            reindexingArrayMetro(item);
                            navBottomUpdate(item.closest('.search-area__item').dataset.searchAreaMetro);
                        })
                        openSpoller(currentElementList, circleItem);
                    } else {
                        station.classList.remove('MetroMap_select');
                        item.classList.remove('MetroMap_select');

                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = false;
                        })
                        navBottomUpdate();
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
                            reindexingArrayMetro(item);
                            navBottomUpdate(item.closest('.search-area__item').dataset.searchAreaMetro);
                        })

                        openSpoller(currentElementList, circleItem);
                    } else {
                        circleItem.classList.remove('MetroMap_select');

                        station.classList.remove('MetroMap_select');

                        currentElementList.forEach(item => {
                            item.querySelector('.checkbox-secondary__input').checked = false;
                        })
                        navBottomUpdate();
                    }
                }
            }
        })

    }

    function reindexingArrayMetro(currentElement) {
        const currentLineElement = currentElement.closest('[data-search-area-metro]').dataset.searchAreaMetro;
        const currentElementArrayIndex = moscowMetroItems[currentLineElement].indexOf(currentElement);
        moscowMetroItems[currentLineElement].splice(0, 0, moscowMetroItems[currentLineElement].splice(currentElementArrayIndex, 1)[0]);
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

    function navBottomUpdate(line) {
        const nav = container.querySelector('.search-area__nav');
        nav.querySelectorAll('.search-area__nav-item').forEach(navItem => {
            if (line && navItem.dataset.searchAreaMetroNav === line) {
                nav.children[0].insertAdjacentElement('beforebegin', navItem);
            }
            if (!navItem.classList.contains('_active')) return;
            navItem.classList.remove('_active');
            navItem.querySelector('div:nth-child(2)').textContent = '';
        });
        const itemsChecked = [];
        for (const key in moscowMetroItems) {
            moscowMetroItems[key].forEach(item => {
                if (item.querySelector('.checkbox-secondary__input').checked) {
                    itemsChecked.push(item);
                }
            })
        }

        itemsChecked.forEach(item => {
            const spoller = item.closest('.search-area__item');
            nav.querySelectorAll('.search-area__nav-item').forEach(navItem => {
                if (navItem.dataset.searchAreaMetroNav === spoller.dataset.searchAreaMetro) {
                    navItem.classList.add('_active');
                    const counter = navItem.querySelector('.search-area__nav-counter');
                    const itemsCheckbox = spoller.querySelectorAll('.checkbox-secondary__input:checked');
                    if (navItem.querySelector('div:nth-child(2)').children.length <= 5 || navItem.classList.contains('_all-visible-item')) {
                        navItem.querySelector('div:nth-child(2)').innerHTML += `
                    <div data-search-area-metro-item="${item.dataset.metroId}">${item.querySelector('.checkbox-secondary__text').textContent.trim()}
                        <button type="button" class="btn btn-reset search-area__nav-close">
                            <svg>
                                <use xlink:href="img/sprite.svg#x"></use>
                            </svg>
                        </button>
                    </div>`;
                    }
                    if (itemsCheckbox.length > 6 && !navItem.classList.contains('_all-visible-item')) {
                        counter.classList.add('_active');
                        counter.querySelector('span').textContent = itemsCheckbox.length - 6;
                    } else {
                        counter.classList.remove('_active');
                    }
                    if (itemsCheckbox.length <= 6 && navItem.classList.contains('_all-visible-item')) {
                        navItem.classList.remove('_all-visible-item');
                    }
                }
            })
        })
    }

    function navBottomCloseItem() {
        const nav = container.querySelector('.search-area__nav');
        nav.addEventListener('click', (e) => {
            const target = e.target;
            const closeBtn = target.closest('.search-area__nav-close');
            if (!closeBtn) return;
            const item = closeBtn.closest('[data-search-area-metro-item]');
            container.querySelectorAll(`[data-metro-id="${item.dataset.searchAreaMetroItem}"]`).forEach(el => {
                el.querySelector('.checkbox-secondary__input').checked = false;
            })
            container.querySelectorAll(`[data-map-metro-id="${item.dataset.searchAreaMetroItem}"]`).forEach(el => {
                el.classList.remove('MetroMap_select');
                const id = el.id.replace('MetroMap_station_', '');
                map.querySelector(`.MetroMap_to_${id}`).classList.remove('MetroMap_select');
            })
            navBottomUpdate();
        })
    }

    function navBottomMoreItem() {
        const nav = container.querySelector('.search-area__nav');
        nav.addEventListener('click', (e) => {
            const target = e.target;
            const moreBtn = target.closest('.search-area__nav-counter');
            if (!moreBtn) return;
            const item = moreBtn.closest('[data-search-area-metro-nav]');
            item.classList.add('_all-visible-item');
            navBottomUpdate();
        })
    }

    function metroHovered() {
        map.addEventListener('mousemove', (e) => {
            const target = e.target;
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

    clearAllBtn.addEventListener('click', clearAll);
};

export default mapMetro;
