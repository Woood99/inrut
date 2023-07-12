import {
    validateRemoveError,
    validateCreateError
} from './formValidate';
import numberReplace from "../modules/numberReplace";

const mortgage = () => {
    let resultMortgage;
    const containerOne = document.querySelector('.object-calc-mort--one');
    const popupContainerOne = document.querySelector('.popup-primary--interest-rate-1 .interest-rate');

    const containerAdd = document.querySelector('.object-calc-mort--add');
    const popupContainerAdd = document.querySelector('.popup-primary--interest-rate-2 .interest-rate--add');
    if (containerAdd && popupContainerAdd) {
        const list = containerAdd.querySelector('.object-calc-mort__list');
        const listPopup = popupContainerAdd.querySelector('.interest-rate__wrapper');
        const items = list.querySelectorAll('[data-mortgage-card]');
        const itemsPopup = listPopup.querySelectorAll('[data-mortgage-card]');
        const textPrc = containerAdd.querySelector('.field-static__text');
        list.addEventListener('click', (e) => {
            toggleClass(e, items, itemsPopup, items);
        })

        listPopup.addEventListener('click', (e) => {
            toggleClass(e, itemsPopup, items, items);
        })

        function toggleClass(e, containerOne, containerTwo, container) {
            const target = e.target;
            const item = target.closest('[data-mortgage-card]');
            if (!item) return;
            containerOne.forEach(item => item.classList.remove('_active'));
            item.classList.add('_active');
            containerTwo.forEach(el => {
                +item.dataset.mortgageCard === +el.dataset.mortgageCard ? el.classList.add('_active') : el.classList.remove('_active');
            });

            container.forEach(el => {
                if (+item.dataset.mortgageCard === +el.dataset.mortgageCard) {
                    const prc = el.querySelector('span:nth-child(2)').textContent;
                    textPrc.textContent = prc;
                }
            })


            if (containerAdd.querySelector('.object-calc-mort__contribution')) {
                resultMortgage();
            }
        }
    }
    if (containerOne && popupContainerOne) {
        const items = popupContainerOne.querySelectorAll('.interest-rate-card');
        items.forEach(item => {
            item.addEventListener('click', () => {

                items.forEach(item => item.classList.remove('_active'));
                item.classList.add('_active');

                const prc = item.querySelector('.interest-rate-card__prc--new').textContent;
                const textPrc = containerOne.querySelector('.field-static__text');
                textPrc.textContent = prc;
            });
        })
    }

    if (containerAdd) {
        const meternalCapital = containerAdd.querySelector('.object-calc-mort__contribution');
        if (meternalCapital) {

            resultMortgage = () => {
                setTimeout(() => {

                    const priceObject = +containerAdd.querySelector('.filter-dropdown--mortgage-calc').dataset.value;
                    const term = +containerAdd.querySelector('.object-calc-mort__term .filter-range-one__nav input').value.trim();
                    const initialFee = containerAdd.querySelector('.object-calc-mort__contribution .filter-range-one__nav input').value.trim().replace(/\s/g, '');
                    const prc = containerAdd.querySelector('.field-static .field-static__text').textContent;
                    const bottom = containerAdd.querySelector('.object-calc-mort__info');
                    const bottomSum = bottom.querySelector('span:nth-child(1) span');
                    const bottomPrc = bottom.querySelector('span:nth-child(2) span');
                    const bottomMonth = bottom.querySelector('span:nth-child(3) span');
                    bottomSum.textContent = `${numberReplace(String(priceObject - initialFee))} ₽`;
                    bottomPrc.textContent = prc.replace('от ', '');

                    const prcValue = (prc.replace('от ', '').replace('%', '').replace(',', '.').trim());
                    bottomMonth.textContent = `${getPayment(priceObject,initialFee, term, prcValue)} ₽/мес.`;
                }, 1000);

                function getPayment(priceObject, initialFee, period, rate) {
                    const month = (rate / 12) / 100;
                    const koef = (month * (Math.pow(1 + month, period * 12))) / (Math.pow(1 + month, period * 12) - 1);

                    const result = (priceObject - initialFee) * koef;

                    return numberReplace(result.toFixed());
                };
            }

            const contributionInput = meternalCapital.querySelector('input');
            const checkbox = meternalCapital.querySelector('.checkbox-secondary:nth-child(2) .checkbox-secondary__input');
            const capital = containerAdd.querySelector('.object-calc-mort__capital');
            const facilities = containerAdd.querySelector('.object-calc-mort__facilities');

            const capitalInput = capital.querySelector('.input-text__input');
            const facilitiesInput = facilities.querySelector('.input-text__input');

            const maxCapital = Number(capital.dataset.capitalMax);
            const minCapital = Number(capital.dataset.capitalMin);

            const priceObject = containerAdd.querySelector('.filter-dropdown--mortgage-calc');
            const meternalCapitalSlider = meternalCapital.querySelector('.filter-range-one__inner').noUiSlider;

            const capitalPrc = meternalCapital.querySelector('.filter-range-one__nav > span');

            priceObject.querySelectorAll('.filter-range-one__inner').forEach(item => {
                item.noUiSlider.on('update', (values) => {
                    if (item.classList.contains('_init')) {
                        const value = parseInt(values[0]);
                        const valueMin = value / 10;
                        const valueMax = value * 90 / 100;
                        meternalCapitalSlider.updateOptions({
                            start: valueMin,
                            range: {
                                min: valueMin,
                                max: valueMax
                            }
                        })
                        updateMatCapital();

                    }
                });

                setTimeout(() => {
                    item.classList.add('_init');
                }, 1);
            })
            meternalCapitalSlider.on('update', (value) => {
                const valueMax = meternalCapitalSlider.options.range.max;
                const result = parseInt(value[0]) * 90 / valueMax;
                if (result >= 10) {
                    capitalPrc.textContent = `${Math.floor(result)}%`;
                }

                labelClearBtnUpdate(capitalInput.closest('.input-text'));
                labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
                updateMatCapital();
                resultMortgage();
            })
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    capital.removeAttribute('hidden');
                    facilities.removeAttribute('hidden');
                    meternalCapital.querySelector('.filter-range-one').classList.add('_disabled');
                } else {
                    capital.setAttribute('hidden', '');
                    facilities.setAttribute('hidden', '');
                    meternalCapital.querySelector('.filter-range-one').classList.remove('_disabled');
                }
                labelClearBtnUpdate(capitalInput.closest('.input-text'));
                labelClearBtnUpdate(facilitiesInput.closest('.input-text'));
                updateMatCapital();
                validate();
                resultMortgage();
            })

            capitalInput.addEventListener('input', () => {
                validate();
            });
            [capitalInput, facilitiesInput].forEach(input => {
                input.addEventListener('input', () => {
                    labelClearBtnUpdate(input.closest('.input-text'));
                    validate();
                    resultMortgage();
                })

                const clearBtn = input.closest('.input-text__label').querySelector('.input-text__clear')
                if (clearBtn) {
                    clearBtn.addEventListener('click', () => {
                        if (!clearBtn.hasAttribute('hidden')) {
                            input.value = '';
                            clearBtn.setAttribute('hidden', '');
                            labelClearBtnUpdate(input.closest('.input-text'));
                            validate();
                            resultMortgage();
                        }
                    })
                }
            });

            function labelClearBtnUpdate(label) {
                const input = label.querySelector('.input-text__input');
                const btn = label.querySelector('.input-text__clear');
                if (input.value === '') {
                    btn.setAttribute('hidden', '');
                    label.classList.remove('_clear-btn');

                    label.classList.remove('_active');
                } else {
                    btn.removeAttribute('hidden');
                    label.classList.add('_clear-btn');
                }
            }

            function updateMatCapital() {
                validateRemoveError(capital);
                validateRemoveError(facilities);
                const contributionValue = Number(contributionInput.value.replace(/\s/g, ''));
                capital.classList.remove('_active');
                facilities.classList.remove('_active');
                if (contributionValue === 0) {
                    return;
                }
                if (contributionValue > maxCapital) {
                    capital.classList.add('_active');
                    facilities.classList.add('_active');
                    capitalInput.value = numberReplace(String(maxCapital));
                    facilitiesInput.value = numberReplace(String(contributionValue - maxCapital));
                    return;
                }
                if (contributionValue < minCapital) {
                    facilities.classList.add('_active');
                    capitalInput.value = '';
                    facilitiesInput.value = numberReplace(String(contributionValue));
                    return;
                }
                if (contributionValue < maxCapital) {
                    capital.classList.add('_active');
                    capitalInput.value = numberReplace(String(contributionValue));
                    facilitiesInput.value = '';
                    return;
                }
                if (contributionValue === maxCapital) {
                    capital.classList.add('_active');
                    capitalInput.value = numberReplace(String(maxCapital));
                    facilitiesInput.value = '';
                    return;
                }
            }

            function validate() {
                let result = true;

                validateRemoveError(capital);
                validateRemoveError(facilities);

                if (Number(capitalInput.value.replace(/\s/g, '')) > maxCapital) {
                    validateCreateError(capital, `${capital.dataset.errorCapitalMax}`);
                }
                if (Number(capitalInput.value.replace(/\s/g, '')) < minCapital) {
                    validateCreateError(capital, `${capital.dataset.errorCapitalMin}`);
                }

                const sum = Number(capitalInput.value.replace(/\s/g, '')) + Number(facilitiesInput.value.replace(/\s/g, ''));
                if (sum > Number(priceObject.dataset.value) * 90 / 100) {
                    validateCreateError(facilities, 'Первоначальный взнос не может быть больше 90% от стоимости недвижимости');
                    result = false;
                }
                if (sum < Number(priceObject.dataset.value) * 10 / 100) {
                    validateCreateError(facilities, 'Первоначальный взнос не может быть меньше 10% от стоимости недвижимости');
                    result = false;
                }

                return result;
            }

            const targetCredit = containerAdd.querySelector('.object-calc-mort__target-credit');
            const targetCreditMap = {
                'Квартира в новостройке': [
                    [1, 2, 3, 4, 5],
                    [5]
                ],
                'Квартира на вторичном рынке': [
                    [1, 4],
                    [1]
                ],
                'Дом или пенхаус': [
                    [2, 4, 3, 5, 6],
                    [5]
                ],
                'Земельный участок': [
                    [2, 4, 3, 5, 6],
                    [5]
                ],
                'Комната': [
                    [1],
                    [1]
                ],
                'Коммерческая недвижимость': [
                    [1],
                    [1]
                ],
                'Гараж,машино-место или кладовая': [
                    [1],
                    [1]
                ],
            };
            targetCredit.addEventListener('change', () => {
                const name = targetCredit.querySelector('.choices__item.choices__item--selectable').textContent.trim();
                const list = containerAdd.querySelector('.object-calc-mort__list')
                const cards = containerAdd.querySelectorAll('.object-calc-mort__btn');
                cards.forEach(card => card.setAttribute('hidden', ''));
                cards.forEach(card => card.classList.remove('_active'));
                for (let key in targetCreditMap) {
                    if (key === name) {
                        const currentKey = targetCreditMap[key];
                        cards.forEach(card => {
                            const id = card.dataset.mortgageCard;
                            if (currentKey[0].includes(+id)) {
                                card.removeAttribute('hidden');
                            }
                            if (currentKey[1].includes(+id)) {
                                card.classList.add('_active');
                            }
                        });
                    }
                }

                let listValue = true;
                for (let key of cards) {
                    if (key.classList.contains('_active')) {
                        listValue = false;
                        break;
                    }
                }
                listValue ? list.setAttribute('hidden', '') : list.removeAttribute('hidden');

                cards.forEach(card => {
                    if (!card.hasAttribute('hidden') && card.classList.contains('_active')) {
                        const textPrc = containerAdd.querySelector('.field-static__text');
                        textPrc.textContent = card.querySelector('span:nth-child(2)').textContent.trim();
                    }
                })

                resultMortgage();
            })

            const term = containerAdd.querySelector('.object-calc-mort__term');
            term.querySelector('.filter-range-one__inner').noUiSlider.on('update', (value) => {
                resultMortgage();
            })
        }
    }
};


export default mortgage;
