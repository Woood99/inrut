import noUiSlider from 'nouislider';
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
    const container = document.querySelector('.filter');
    if (!container) return;
    const controls = container.querySelector('.filter__controls');
    const btn = container.querySelector('.filter__btn-control');
    const btnTextMap = {
        more: 'Ещё фильтры',
        all: 'Показать фильтры',
        none: 'Скрыть фильтры'
    }
    const rows = container.querySelectorAll('.filter__row');
    const oneRow = rows[0];
    const twoRow = rows[1];
    oneRow.style.maxHeight = oneRow.scrollHeight + 'px';
    btn.addEventListener('click', () => {
        if (controls.classList.contains('more')) {
            twoRow.classList.add('visible');
            twoRow.style.maxHeight = twoRow.scrollHeight + 'px';
            controls.classList.remove('more');
            controls.classList.add('none');
            btn.querySelector('span').textContent = btnTextMap.none;
            return;
        }
        if (controls.classList.contains('none')) {
            oneRow.classList.remove('visible');
            twoRow.classList.remove('visible');
            oneRow.style.maxHeight = null;
            twoRow.style.maxHeight = null;
            controls.classList.remove('none');
            controls.classList.add('all');
            btn.querySelector('span').textContent = btnTextMap.all;
            return;
        }
        if (controls.classList.contains('all')) {
            oneRow.classList.add('visible');
            oneRow.style.maxHeight = oneRow.scrollHeight + 'px';
            controls.classList.remove('all');
            controls.classList.add('more');
            btn.querySelector('span').textContent = btnTextMap.more;
            return;
        }
    });
}
