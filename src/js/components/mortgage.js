import {
    validateRemoveError,
    validateCreateError
} from './formValidate';
import numberReplace from "../modules/numberReplace";

const mortgage = () => {
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
            const contributionInput = meternalCapital.querySelector('input');
            const checkbox = meternalCapital.querySelector('.checkbox-secondary:nth-child(2) .checkbox-secondary__input');
            const capital = containerAdd.querySelector('.object-calc-mort__capital');
            const facilities = containerAdd.querySelector('.object-calc-mort__facilities');

            const capitalInput = capital.querySelector('.input-text__input');
            const facilitiesInput = facilities.querySelector('.input-text__input');
            const maxCapital = Number(capital.dataset.capitalMax);
            const priceObject = containerAdd.querySelector('.filter-dropdown--mortgage-calc');
            const meternalCapitalSlider = meternalCapital.querySelector('.filter-range-one__inner').noUiSlider;

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
                    }
                });

                setTimeout(() => {
                    item.classList.add('_init');
                }, 1);
            })
            meternalCapitalSlider.on('update', (values) => {
                const value = parseInt(values[0]);
                const valueMax = meternalCapitalSlider.options.range.max;
                const result = value * 90 / valueMax;
                if (result >= 10) {
                    meternalCapital.querySelector('.filter-range-one__nav > span').textContent = `${Math.floor(result)}%`;
                }
            })
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {


                    capital.removeAttribute('hidden');
                    facilities.removeAttribute('hidden');
                    meternalCapital.querySelector('.filter-range-one').classList.add('_disabled');
                    const contributionValue = Number(contributionInput.value.replace(/\s/g, ''));

                    capital.classList.remove('_active');
                    facilities.classList.remove('_active');

                    if (contributionValue > maxCapital) {
                        capital.classList.add('_active');
                        facilities.classList.add('_active');
                        capitalInput.value = numberReplace(String(maxCapital));
                        facilitiesInput.value = numberReplace(String(contributionValue - maxCapital));
                    }
                    if (contributionValue < maxCapital) {
                        capital.classList.add('_active');
                        capitalInput.value = numberReplace(String(contributionValue));
                        facilitiesInput.value = '';
                    }
                    if (contributionValue === maxCapital) {
                        capital.classList.add('_active');
                        capitalInput.value = numberReplace(String(maxCapital));
                        facilitiesInput.value = '';
                    }
                } else {
                    capital.setAttribute('hidden', '');
                    facilities.setAttribute('hidden', '');
                    meternalCapital.querySelector('.filter-range-one').classList.remove('_disabled');
                }
            })



            capitalInput.addEventListener('input', () => {
                validateRemoveError(capital);
                if (Number(capitalInput.value.replace(/\s/g, '')) > maxCapital) {
                    validateCreateError(capital, `${capital.dataset.validateError}`);
                }
            });
            [capitalInput, facilitiesInput].forEach(input => {
                input.addEventListener('input', () => {
                    const sum = Number(capitalInput.value.replace(/\s/g, '')) + Number(facilitiesInput.value.replace(/\s/g, ''));
                    if (sum > Number(priceObject.dataset.value) * 90 / 100) {
                        removeError90prc();
                        const errorSpan = document.createElement('span');
                        errorSpan.classList.add('_error-span-90prc');
                        errorSpan.textContent = 'Первоначальный взнос не может быть больше 90% от стоимости недвижимости';

                        capital.append(errorSpan);
                        capital.classList.add('_error-90prc');
                    } else {
                        removeError90prc();
                    }
                    if (sum < Number(priceObject.dataset.value) * 10 / 100) {
                        removeError10prc();
                        const errorSpan = document.createElement('span');
                        errorSpan.classList.add('_error-span-10prc');
                        errorSpan.textContent = 'Первоначальный взнос не может быть меньше 10% от стоимости недвижимости';

                        capital.append(errorSpan);
                        capital.classList.add('_error-10prc');
                    } else {
                        removeError10prc();
                    }
                })
            });


            function removeError90prc() {
                if (capital.classList.contains('_error-90prc')) {
                    capital.querySelector('._error-span-90prc').remove();
                    capital.classList.remove('_error-90prc');
                }
            }

            function removeError10prc() {
                if (capital.classList.contains('_error-10prc')) {
                    capital.querySelector('._error-span-10prc').remove();
                    capital.classList.remove('_error-10prc');
                }
            }

        }
    }


};


export default mortgage;
