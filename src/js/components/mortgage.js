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
            const checkbox = meternalCapital.querySelector('.checkbox-secondary__input');
            const capital = containerAdd.querySelector('.object-calc-mort__capital');
            const facilities = containerAdd.querySelector('.object-calc-mort__facilities');
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    capital.removeAttribute('hidden');
                    facilities.removeAttribute('hidden');
                } else {
                    capital.setAttribute('hidden', '')
                    facilities.setAttribute('hidden', '')
                }
            })

            const capitalInput = capital.querySelector('.input-text__input');
            const facilitiesInput = facilities.querySelector('.input-text__input');
            [capitalInput, facilitiesInput].forEach(input => {
                input.addEventListener('input', () => {
                    if (input.value.length >= 2 && input.value[0] === '0') {
                        input.value = input.value.slice(1);
                    }
                })
                input.addEventListener('focusin', () => {
                    input.value = input.value.replace(' ₽', '');
                })
                input.addEventListener('focusout', () => {
                    if (input.value !== '' && input.value !== '0') input.value += ' ₽';
                })
            })

        }
    }
};


export default mortgage;
