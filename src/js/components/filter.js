import noUiSlider from 'nouislider';
import enableScroll from '../modules/enableScroll';
import disableScroll from '../modules/disableScroll';
export const filterBudget = () => {
    const container = document.querySelectorAll('.filter-dropdown');
    if (!container.length >= 1) return;
    container.forEach(el => {
        const btn = el.querySelector('.filter-dropdown__button');
        btn.addEventListener('click', () => {
            el.classList.toggle('active');
        })
    })
}
export const uiSlider = () => {
    const items = document.querySelectorAll('.filter-range__inner');
    if (!items.length >= 1) return;
    items.forEach(el => {
        const container = el.closest('.filter-range');
        const minValue = el.dataset.min;
        const maxValue = el.dataset.max;
        const defaultStart = container.querySelector('[data-default-start]');
        const defaultEnd = container.querySelector('[data-default-end]');
        noUiSlider.create(el, {
            start: [Number(defaultStart.dataset.defaultStart), Number(defaultEnd.dataset.defaultEnd)],
            connect: true,
            range: {
                'min': Number(minValue),
                'max': Number(maxValue),
            }
        });
        el.noUiSlider.on('update', function (values) {
            defaultStart.textContent = numberReplace(values[0]);
            defaultEnd.textContent = numberReplace(values[1]);
        });
    });

    function numberReplace(number) {
        return number.match(/^(.*?)((?:[,.]\d+)?|)$/)[1].replace(/\B(?=(?:\d{3})*$)/g, ' ');
    }
}
export const filterDropdownChoice = () => {
    const items = document.querySelectorAll('.filter-dropdown__dropdown');
    if (!items.length >= 1) return;
    items.forEach(item => {
        item.querySelectorAll('.filter-dropdown__choice').forEach(el => {
            el.addEventListener('click', () => {
                if (!el.closest('.filter-dropdown__item').classList.contains('active')) {
                    item.querySelectorAll('.filter-dropdown__item').forEach(el => el.classList.remove('active'));
                    el.closest('.filter-dropdown__item').classList.add('active');
                }
            })
        })
    })
}
export const filterControl = () => {
    const container = document.querySelector('.filter--more');
    if (!container) return;
    const controls = container.querySelector('.filter__controls');
    const btn = container.querySelector('.filter__btn-control');
    const btnTextMap = {
        more: 'Ещё фильтры',
        none: 'Скрыть фильтры'
    }
    const rows = container.querySelectorAll('.filter__row');
    const oneRow = rows[0];
    const twoRow = rows[1];
    btn.addEventListener('click', () => {
        if (controls.classList.contains('more')) {
            twoRow.classList.add('visible');
            controls.classList.remove('more');
            controls.classList.add('none');
            btn.querySelector('span').textContent = btnTextMap.none;
            return;
        }
        if (controls.classList.contains('none')) {
            twoRow.classList.remove('visible');
            twoRow.style.maxHeight = null;
            controls.classList.remove('none');
            controls.classList.add('more');
            btn.querySelector('span').textContent = btnTextMap.more;
            return;
        }
    });
}


export const filterMobile = () => {
    const btn = document.querySelector('.filter__btn');
    const container = document.querySelector('.filter__container');
    if (!(btn && container)) return;
    const close = document.querySelector('.filter__close');
    btn.addEventListener('click', () => {
        container.classList.add('active');
        disableScroll();
    });
    close.addEventListener('click', () => {
        if (container.classList.contains('active')) {
            container.classList.remove('active');
            enableScroll();
        }
    });
}
