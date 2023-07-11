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
            })

        }
    }


};


export default mortgage;
