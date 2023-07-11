import noUiSlider from 'nouislider';
import enableScroll from '../modules/enableScroll';
import disableScroll from '../modules/disableScroll';
import inputResize from '../modules/inputResize';
import numberReplace from '../modules/numberReplace';
import {
    _slideToggle,
    _slideDown,
    _slideUp
} from '../support-modules/slide';
export const filterSum = () => {
    const container = document.querySelectorAll('.filter-dropdown');
    if (!container.length >= 1) return;
    container.forEach(el => {
        const btn = el.querySelector('.filter-dropdown__button');
        const inputs = el.querySelectorAll('.filter-range__nav input');
        btn.addEventListener('click', () => {
            container.forEach(elTwo => {
                if (elTwo !== el) elTwo.classList.remove('active')
            });
            el.classList.toggle('active');
            if (!el.classList.contains('active')) {
                changeTitle(el);
            }
        })
        document.addEventListener('click', (e) => {
            if (el.classList.contains('active') && !e.target.closest('.filter-dropdown')) {
                el.classList.remove('active');
                changeTitle(el);
            } else if (e.target.closest('.filter-dropdown')) {
                changeTitle(el);
            }
        })
        inputs.forEach(input => {
            input.addEventListener('change', () => {
                changeTitle(el);
            });
            input.addEventListener('input', () => {
                changeTitle(el);
            });
        })
    })

    function changeTitle(el) {
        const itemActive = el.querySelector('.filter-dropdown__item.active');
        const inputs = itemActive.querySelectorAll('input');
        const buttonWrapper = el.querySelector('.filter-dropdown__button-wrapper');
        let html = ``;


        if (inputs[0].value && inputs[1].value) {
            if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма' || el.dataset.filterDropdownName === 'Стоимость объекта') {
                html = `
                    <div>
                        ${el.dataset.filterDropdownName}
                    </div>
                    <div>
                       от ${convertSum(inputs[0].value)}
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                    до ${convertSum(inputs[1].value)}
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Площадь' || el.dataset.filterDropdownName === 'Площадь кухни') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
                </div>
                    <div>
                       от ${inputs[0].value} м²
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${inputs[1].value} м²
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Этаж') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                       от ${inputs[0].value} эт.
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${inputs[1].value} эт.
                    </div>
                `;
            }
            buttonWrapper.classList.add('_active')
        } else if (inputs[0].value && inputs[1].value === '') {
            if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма' || el.dataset.filterDropdownName === 'Стоимость объекта') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${convertSum(inputs[0].value)}
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${convertSum(itemActive.querySelector('[data-max]').dataset.max)}
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Площадь' || el.dataset.filterDropdownName === 'Площадь кухни') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${inputs[0].value} м²
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${itemActive.querySelector('[data-max]').dataset.max} м²
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Этаж') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${inputs[0].value} эт.
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${itemActive.querySelector('[data-max]').dataset.max} эт.
                    </div>
                `;
            }
            buttonWrapper.classList.add('_active')
        } else if (inputs[1].value && inputs[0].value === '') {
            if (el.dataset.filterDropdownName === 'Цена' || el.dataset.filterDropdownName === 'Сумма'  || el.dataset.filterDropdownName === 'Стоимость объекта') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${convertSum(itemActive.querySelector('[data-min]').dataset.min)}
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${convertSum(inputs[1].value)}
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Площадь' || el.dataset.filterDropdownName === 'Площадь кухни') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${itemActive.querySelector('[data-min]').dataset.min} м²
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${inputs[1].value} м²
                    </div>
                `;
            }
            if (el.dataset.filterDropdownName === 'Этаж') {
                html = `
                <div>
                ${el.dataset.filterDropdownName}
            </div>
                    <div>
                        от ${itemActive.querySelector('[data-min]').dataset.min} эт.
                    </div>
                    <div>
                        -
                    </div>
                    <div>
                        до ${inputs[1].value} эт.
                    </div>
                `;
            }
            buttonWrapper.classList.add('_active')
        } else {
            html = `
                <div>${el.dataset.filterDropdownName}</div>
                <div>${el.dataset.filterDropdownSubtitle}</div>
                `;
            buttonWrapper.classList.remove('_active')
        }

        buttonWrapper.innerHTML = html;

    }


    function convertSum(number) {
        number = number.replace(/\s/g, "");
        let result;
        if (number < 1000) {
            result = Number(number);
            return result;
        }
        result = Math.floor(Number(number)) >= 1.0e+6 ?
            (Math.round(Number(number)) / 1.0e+6).toFixed(1) + " млн." :
            Math.round(Number(number)) >= 1.0e+3 ?
            (Math.round(Number(number)) / 1.0e+3).toFixed(1) + " тыс." :
            Math.round(Number(number));
        return result.replace('.0', '');
    }
}
export const searchSelect = () => {
    const containers = document.querySelectorAll('.search-select');
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        const btn = container.querySelector('.search-select__button');
        const body = container.querySelector('.search-select__dropdown');
        btn.addEventListener('click', () => {
            containers.forEach(el => {
                if (el !== container) el.classList.remove('_active')
            });
            container.classList.toggle('_active');
        })
        document.addEventListener('click', (e) => {
            if (container.classList.contains('_active') && !e.target.closest('.search-select')) {
                container.classList.remove('_active');
            }
        })
        const items = body.querySelectorAll('.search-select__item .checkbox-secondary__input');
        const btnWrapper = btn.querySelector('.search-select__button-wrapper')
        const btnList = btnWrapper.querySelector('div:nth-child(2)');
        const arrSelected = [];
        items.forEach(input => {
            input.addEventListener('change', () => {
                const currentElem = input.closest('.search-select__item').querySelector('.checkbox-secondary__text').textContent.trim();
                if (input.checked) {
                    arrSelected.push(currentElem);
                } else {
                    const index = arrSelected.indexOf(currentElem);
                    if (index !== -1) {
                        arrSelected.splice(index, 1);
                    }
                }
                updatePlaceholder()
            })
        })

        function updatePlaceholder() {
            if (arrSelected.length >= 1) {
                btnList.textContent = '';
                btnWrapper.classList.add('_active');
            } else {
                btnList.textContent = container.dataset.searchSelectSubtitle;
                btnWrapper.classList.remove('_active');
            }
            arrSelected.forEach(el => {
                btnList.textContent += `${el}, `;
            });

            if (btnList.textContent !== container.dataset.searchSelectSubtitle) {
                btnList.textContent = btnList.textContent.slice(0, -2);
            }
        }
    });
}
export const searchSelectOne = () => {
    const containers = document.querySelectorAll('.search-select-one');
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        const btn = container.querySelector('.search-select-one__button');
        const list = container.querySelectorAll('.search-select-one__item');
        const input = container.querySelector('.search-select-one__input-hidden');
        const placeholder = container.querySelector('.search-select-one__button-wrapper div:nth-child(2)');
        btn.addEventListener('click', () => {
            containers.forEach(el => {
                if (el !== container) el.classList.remove('_active')
            });
            container.classList.toggle('_active');
        })
        document.addEventListener('click', (e) => {
            if (container.classList.contains('_active') && !e.target.closest('.search-select-one')) {
                container.classList.remove('_active');
            }
        })
        list.forEach(item => {
            item.addEventListener('click', () => {
                list.forEach(item => item.classList.remove('_active'));

                input.value = item.dataset.value;
                item.classList.add('_active');
                placeholder.textContent = item.textContent;

                container.classList.remove('_active');

                container.classList.add('_selected');


                if (container.classList.contains('create-meeting-show__form--object')) {
                    if (container.classList.contains('_error')) {
                        container.querySelector('._error-span').remove();
                        container.classList.remove('_error');
                    }
                }
            })
        })
    });
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
        inputMin.value = '';
        inputMax.value = '';
        el.noUiSlider.on('update', function (values, handle) {
            if (container.classList.contains('filter-range--improved')) {
                if ((inputs[0].value === '' && +numberReplace(values[0]).replace(/\s/g, '') === Number(minValue)) &&
                    (inputs[1].value === '' && +numberReplace(values[1]).replace(/\s/g, '') === Number(maxValue))) {
                    container.classList.remove('_selected');
                    return;
                } else {
                    container.classList.add('_selected');
                }
            }
            inputs[handle].value = numberReplace(values[handle]);
        });
        inputMin.value = '';
        inputMax.value = '';

        inputMin.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "");
            if (inputMax.value === '') {
                if (inputMin.value === '') {
                    el.noUiSlider.set([Number(minValue), null]);
                    inputMin.value = '';
                    inputMax.value = '';
                } else {
                    el.noUiSlider.set([numberString, null]);
                    inputMax.value = '';
                }
            } else {
                if (inputMin.value === '') {
                    el.noUiSlider.set([Number(minValue), null]);
                    inputMin.value = '';
                } else {
                    el.noUiSlider.set([numberString, null]);
                }
            }
        })
        inputMax.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "");
            if (inputMin.value === '') {
                if (inputMax.value === '') {
                    el.noUiSlider.set([null, Number(maxValue)]);
                    inputMax.value = '';
                    inputMin.value = '';
                } else {
                    el.noUiSlider.set([null, numberString]);
                    inputMin.value = '';
                }
            } else {
                if (inputMax.value === '') {
                    el.noUiSlider.set([null, Number(maxValue)]);
                    inputMax.value = '';
                } else {
                    el.noUiSlider.set([null, numberString]);
                }
            }
        })

        inputMin.addEventListener('input', () => {
            const val = inputMin.value.replace(/\D/g, '');
            inputMin.value = numberReplace(val);
        })
        inputMax.addEventListener('input', () => {
            const val = inputMax.value.replace(/\D/g, '');
            inputMax.value = numberReplace(val);
        })

    });
}
export const uiSliderOne = () => {
    const items = document.querySelectorAll('.filter-range-one__inner');
    if (!items.length >= 1) return;
    items.forEach(el => {
        const container = el.closest('.filter-range-one');
        const minValue = el.dataset.min;
        const maxValue = el.dataset.max;
        const defaultValue = container.querySelector('[data-default]');

        const inputMax = defaultValue.querySelector('input');
        noUiSlider.create(el, {
            start: [Number(defaultValue.dataset.default)],
            connect: 'lower',
            range: {
                'min': Number(minValue),
                'max': Number(maxValue),
            },
            step: 1,
        });
        el.noUiSlider.on('update', function (values, handle) {
            inputMax.value = numberReplace(values[handle])
            inputResize(inputMax);
            if (el.closest('.object-calc-mort__contribution')) {
                console.log(el);
            }
        });

        inputMax.addEventListener('change', function () {
            const numberString = this.value.replace(/\s/g, "")
            el.noUiSlider.set([numberString]);

            inputResize(inputMax);
        })
        inputResize(inputMax);
        inputMax.addEventListener('input', () => {
            const val = inputMax.value.replace(/\D/g, '');
            inputMax.value = numberReplace(val);
            inputResize(inputMax);
        })
    });
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
    const containers = document.querySelectorAll('.filter--more');
    if (containers.length === 0) return;
    containers.forEach(container => {
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
    })




}
export const filterMobile = () => {
    const containers = document.querySelectorAll('.filter');
    containers.forEach(filter => {
        const btn = filter.querySelector('.filter__btn');
        const container = filter.querySelector('.filter__container');
        if (!(btn && container)) return;
        const close = filter.querySelector('.filter__close');
        const mask = filter.querySelector('.filter__mask');
        btn.addEventListener('click', () => {
            mask ? mask.classList.add('active') : container.classList.add('active');
            disableScroll();
        });
        close.addEventListener('click', () => {
            if (container.classList.contains('active')) container.classList.remove('active');
            if (mask && mask.classList.contains('active')) mask.classList.remove('active');
            if (!exceptionEnableScroll()) enableScroll();
        });
        filter.addEventListener('click', (e) => {
            const target = e.target;
            if (target.classList.contains('filter__mask') && target.classList.contains('active')) {
                mask.classList.remove('active');
                if (!exceptionEnableScroll()) enableScroll();
            }
        })

        function exceptionEnableScroll() {
            return filter.closest('.checkboard-cst-popup') || filter.closest('.popup-primary');
        }
    })
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
        const titleDefault = title.textContent;

        let certificateBoolean = false;
        let mortgageNoFeeBoolean = false;

        cash.addEventListener('change', () => {
            if (cash.checked) {
                item.classList.add('_selected');

                mortgageYesBank.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);
                mortgageNoFee.setAttribute('disabled', true);

                certificate.removeAttribute('disabled');

                movingCheckbox(1, certificate);

                title.textContent = cash.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                mortgageYesBank.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();
                title.textContent = titleDefault;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        });
        mortgageYesBank.addEventListener('change', () => {
            if (mortgageYesBank.checked) {
                item.classList.add('_selected');

                cash.setAttribute('disabled', true);
                mortgageNoBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageYesBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageYesBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                cash.removeAttribute('disabled');
                mortgageNoBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                movingCheckboxDefault();

                title.textContent = titleDefault;
                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        });
        mortgageNoBank.addEventListener('change', () => {
            if (mortgageNoBank.checked) {
                item.classList.add('_selected');

                cash.setAttribute('disabled', true);
                mortgageYesBank.setAttribute('disabled', true);

                mortgageNoFee.removeAttribute('disabled');
                certificate.removeAttribute('disabled');

                movingCheckbox(0, mortgageNoBank);
                movingCheckbox(1, mortgageNoFee);
                movingCheckbox(2, certificate);

                title.textContent = mortgageNoBank.closest('.checkbox-secondary').querySelector('.checkbox-secondary__text').textContent;
            } else {
                item.classList.remove('_selected');

                cash.removeAttribute('disabled');
                mortgageYesBank.removeAttribute('disabled');

                mortgageNoFee.setAttribute('disabled', true);
                certificate.setAttribute('disabled', true);

                title.textContent = titleDefault;

                movingCheckboxDefault();

                if (mortgageNoFee.checked) mortgageNoFee.checked = false;
                if (certificate.checked) certificate.checked = false;

                certificateBoolean = false;
                mortgageNoFeeBoolean = false;
            }
        });

        certificate.addEventListener('change', () => {
            const value = certificate.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!certificateBoolean) {
                title.textContent += `, ${value}`;
                certificateBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                certificateBoolean = false;
            }
        })
        mortgageNoFee.addEventListener('change', () => {
            const value = mortgageNoFee.nextElementSibling.querySelector('.checkbox-secondary__text').textContent.trim();
            if (!mortgageNoFeeBoolean) {
                title.textContent += `, ${value}`;
                mortgageNoFeeBoolean = true;
            } else {
                title.textContent = title.textContent.replace(`, ${value}`, '');
                mortgageNoFeeBoolean = false;
            }
        })

        function movingCheckbox(index, element) {
            dropdownContainer.children[index].insertAdjacentElement('beforebegin', element.closest('.checkbox-secondary'));
        }

        function movingCheckboxDefault() {
            checkboxes.forEach((checkbox, index) => movingCheckbox(index, checkbox));
        }
    });
};
export const dropdownDefault = (containerEl, targetEl, dropdownEl) => {
    const container = document.querySelector(containerEl);
    if (!container) return;
    const target = container.querySelector(targetEl);
    const dropdown = container.querySelector(dropdownEl);
    target.addEventListener('click', () => {
        !target.classList.contains('_active') ? openDropdown() : closeDropdown();
    });
    document.addEventListener('click', (e) => {
        if (target.classList.contains('_active') && !e.target.closest(containerEl)) closeDropdown();
    })

    function openDropdown() {
        dropdown.classList.add('_active');
        target.classList.add('_active');
    }

    function closeDropdown() {
        dropdown.classList.remove('_active');
        target.classList.remove('_active');
    }
}
