export const cardSecondaryActions = () => {
    const cards = document.querySelectorAll('.card-secondary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-secondary__item');
        const imagePagination = card.querySelector('.card-secondary__pagination');
        cardImageSwitch(card, imageSwitchItems, imagePagination);

        card.addEventListener('click',(e) => {
            const favorite = e.target.closest('.card-secondary__info--favorite');
            if (favorite) {
                e.preventDefault();
                card.querySelectorAll('.card-secondary__info--favorite').forEach(el => el.classList.toggle('_active'));
            }
        })
    })
};
export const cardPrimaryActions = () => {
    const cards = document.querySelectorAll('.card-primary');
    if (cards.length === 0) return;
    cards.forEach(card => {

        const imageSwitchItems = card.querySelectorAll('.card-primary__item');
        const imagePagination = card.querySelector('.card-primary__pagination');
        cardImageSwitch(card, imageSwitchItems, imagePagination);

        card.addEventListener('click',(e) => {
            const favorite = e.target.closest('.card-primary__info--favorite');
            if (favorite) {
                e.preventDefault();
                card.querySelectorAll('.card-primary__info--favorite').forEach(el => el.classList.toggle('_active'));
            }
        })

    })
};



function cardImageSwitch(card, imageSwitchItems, imagePagination) {
    if (window.innerWidth <= 768) return;
    if (imageSwitchItems.length <= 1) return;
    imageSwitchItems.forEach((el, index) => {
        el.setAttribute('data-index', index);
        imagePagination.innerHTML += `<li class="image-pagination__item ${index == 0 ? 'image-pagination__item--active' : ''}" data-index="${index}"></li>`;
        el.addEventListener('mouseenter', (e) => {
            if (window.innerWidth > 768) {
                card.querySelectorAll('.image-pagination__item').forEach(el => {
                    el.classList.remove('image-pagination__item--active')
                });
                card.querySelector(`.image-pagination__item[data-index="${e.currentTarget.dataset.index}"]`).classList.add('image-pagination__item--active');
            }
        });

        el.addEventListener('mouseleave', (e) => {
            if (window.innerWidth > 768) {
                card.querySelectorAll('.image-pagination__item').forEach(el => {
                    el.classList.remove('image-pagination__item--active')
                });
                card.querySelector(`.image-pagination__item[data-index="0"]`).classList.add('image-pagination__item--active');
            }
        });
    });
}
