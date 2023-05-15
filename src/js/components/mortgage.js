const mortgage = () => {
    const containerOne = document.querySelector('.object-calc-mort');
    const popupContainerOne = document.querySelector('.popup-primary--interest-rate-1 .interest-rate--add');

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
};


mortgage();
