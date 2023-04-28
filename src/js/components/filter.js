import noUiSlider from 'nouislider';
import enableScroll from '../modules/enableScroll';
import disableScroll from '../modules/disableScroll';
import inputResize from '../modules/inputResize';
import {
    _slideToggle
} from '../support-modules/slide';
export const filterBudget = () => {
    const container = document.querySelectorAll('.filter-dropdown');
    if (!container.length >= 1) return;
    container.forEach(el => {
        const btn = el.querySelector('.filter-dropdown__button');
        btn.addEventListener('click', () => {
            el.classList.toggle('active');
        })
        document.addEventListener('click', (e) => {
            if (el.classList.contains('active') && !e.target.closest('.filter-dropdown')) {
                el.classList.remove('active');
            }
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
        const defaultStart = container.querySelector('[data-range-start]');
        const defaultEnd = container.querySelector('[data-range-end]');

        const inputMin = defaultStart.querySelector('input');
        const inputMax = defaultEnd.querySelector('input');
        const inputs = [inputMin, inputMax];

        noUiSlider.create(el, {
            start: [Number(minValue), Number(maxValue)],
            connect: true,
            range: {
                'min': Number(minValue),
                'max': Number(maxValue),
            },
            step: 1,
        });
        el.noUiSlider.on('update', function (values, handle) {
            inputs[handle].value = numberReplace(values[handle]);
            if (inputMax.value) container.classList.add('_active');
            if (inputMin.value) container.classList.add('_active');
            if (inputMin.value !== '') {
                container.classList.add('_active');
            } else {
                container.classList.remove('_active');
            }
        });
        inputMin.value = '';
        inputMax.value = '';
        container.classList.remove('_active');
        inputMin.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "")
            el.noUiSlider.set([numberString, null]);
            if (numberString !== ' ') container.classList.add('_active');
        })
        inputMax.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "")
            el.noUiSlider.set([null, numberString]);
            if (numberString !== ' ') container.classList.add('_active');
        })
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                const val = input.value.replace(/\D/g, '');
                input.value = numberReplace(val);
                if (input.value) container.classList.add('_active');
                if (inputMin.value === ' ') container.classList.remove('_active');
            })
        })
    });

    function numberReplace(number) {
        return number.match(/^(.*?)((?:[,.]\d+)?|)$/)[1].replace(/\B(?=(?:\d{3})*$)/g, ' ');
    }
}
export const uiSliderOne = () => {
    const items = document.querySelectorAll('.filter-range-one__inner');
    if (!items.length >= 1) return;
    items.forEach(el => {
        const container = el.closest('.filter-range-one');
        const minValue = el.dataset.min;
        const maxValue = el.dataset.max;
        const defaultEnd = container.querySelector('[data-default-end]');

        const inputMax = defaultEnd.querySelector('input');

        noUiSlider.create(el, {
            start: [Number(minValue), Number(defaultEnd.dataset.defaultEnd)],
            connect: true,
            range: {
                'min': Number(minValue),
                'max': Number(maxValue),
            },
            step: 1,
        });
        el.noUiSlider.on('update', function (values, handle) {
            inputMax.value = numberReplace(values[handle])
            inputResize(inputMax);
        });

        inputMax.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "")
            el.noUiSlider.set([null, numberString]);

            inputResize(inputMax);
        })

        inputResize(inputMax);
        inputMax.addEventListener('input', () => {
            const val = inputMax.value.replace(/\D/g, '');
            inputMax.value = numberReplace(val);
            inputResize(inputMax);
        })
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
    const itemsHidden = container.querySelectorAll('.filter__row[hidden]');
    const moreBtn = container.querySelector('.filter__btn-control');
    const btnTextMap = {
        more: moreBtn.querySelector('span').textContent,
        none: 'Скрыть фильтры'
    }
    if (itemsHidden.length === 0) {
        moreBtn.remove();
        return;
    };
    moreBtn.addEventListener('click', () => {
        if (container.classList.contains('_active')) {
            itemsHidden.forEach(item => {
                _slideToggle(item, 700);
            });
            moreBtn.querySelector('span').textContent = btnTextMap.more;
            container.classList.remove('_active');
        } else {
            itemsHidden.forEach(item => {
                _slideToggle(item, 700);
            });
            moreBtn.querySelector('span').textContent = btnTextMap.none;
            container.classList.add('_active');
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
export const filterCustomSelectCheckboxes = () => {
    const items = document.querySelectorAll('.select-dropdown-checkbox');
    if (items.length <= 0) return;
    items.forEach(item => {
        const btn = item.querySelector('.select-dropdown-checkbox__button');
        const title = item.querySelector('.select-dropdown-checkbox__title');
        btn.addEventListener('click', () => {
            item.classList.toggle('_active');
        });
        document.addEventListener('click', (e) => {
            if (item.classList.contains('_active') && !e.target.closest('.select-dropdown-checkbox')) {
                item.classList.remove('_active');
            }
        })
        const dropdownContainer = item.querySelector('.select-dropdown-checkbox__dropdown');
        const checkboxes = item.querySelectorAll('.checkbox-secondary__input');
        const cash = item.querySelector('[data-name="cash"]');
        const mortgageYesBank = item.querySelector('[data-name="mortgage_yes-bank"]');
        const mortgageNoBank = item.querySelector('[data-name="mortgage_no-bank"]');
        const mortgageNoFee = item.querySelector('[data-name="mortgage_no-fee"]');
        const certificate = item.querySelector('[data-name="certificate"]');
        mortgageNoFee.setAttribute('disabled', true);
        title.textContent = 'Не выбрано';

        cash.addEventListener('change', () => {
            if (cash.checked) {
                mortgageYesBank.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);
                mortgageNoFee.setAttribute('disabled', true);

                certificate.removeAttribute('disabled');

                movingCheckbox(1, certificate);

                title.textContent = cash.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                mortgageYesBank.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();
                title.textContent = 'Не выбрано';
                if (certificate.checked) certificate.checked = false;
            }
        });
        mortgageYesBank.addEventListener('change', () => {
            if (mortgageYesBank.checked) {
                cash.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageYesBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageYesBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                cash.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();

                title.textContent = 'Не выбрано';
                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;
            }
        });
        mortgageNoBank.addEventListener('change', () => {
            if (mortgageNoBank.checked) {
                cash.setAttribute('disabled', true);
                mortgageYesBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageNoBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageNoBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                cash.removeAttribute('disabled');
                mortgageYesBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                title.textContent = 'Не выбрано';

                movingCheckboxDefault();

                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;
            }
        });


        function movingCheckbox(index, element) {
            dropdownContainer.children[index].insertAdjacentElement('beforebegin', element.closest('.checkbox-secondary'));
        }

        function movingCheckboxDefault() {
            checkboxes.forEach((checkbox, index) => movingCheckbox(index, checkbox));
        }
    });
};
