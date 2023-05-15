const mortgageChoices = () => {
    const container = document.querySelector('.object-calc-mort');
    const popupContainer = document.querySelector('.interest-rate--add');
    if (container && popupContainer) {
        const list = container.querySelector('.object-calc-mort__list');
        const items = list.querySelectorAll('[data-mortgage-card]');
        list.addEventListener('click', (e) => {
            const target = e.target;
            const item = target.closest('[data-mortgage-card]');
            if (item) {
                items.forEach(item => item.classList.remove('_active'));
                item.classList.add('_active');
                popupToggleClass(+item.dataset.mortgageCard);
            }
        })

        function popupToggleClass(id) {
            const popupItems = popupContainer.querySelectorAll('.interest-rate-card');
            popupItems.forEach(item => {
                if (+item.dataset.mortgageCard === id) {
                    item.classList.add('_active');
                } else {
                    item.classList.remove('_active');
                }
            });
        }

    }

};

mortgageChoices();
