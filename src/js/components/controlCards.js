function controlCards() {
    const containers = document.querySelectorAll('.control-cards');
    if (!containers.length) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.control-cards__btn');
        const content = container.querySelector('.control-cards__content');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(el => el.classList.remove('_active'));
                btn.classList.add('_active');
                content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical');
                if (checkHorizontal(btn)) {
                    content.classList.add('control-cards__content--horizontal');
                }
                if (checkVertical(btn)) {
                    content.classList.add('control-cards__content--vertical');
                }


                if (content.querySelectorAll('.card-secondary').length >= 1) {
                    const cardsSecondary = content.querySelectorAll('.card-secondary');

                    cardsSecondary.forEach(card => {
                        const options = card.querySelector('.card-secondary__options');
                        if (options) {

                            if (checkHorizontal(btn)) {
                                card.querySelector('.card-secondary__bottom').insertAdjacentElement('beforebegin', options);
                            }
                            if (checkVertical(btn)) {
                                card.querySelector('.card-secondary__info--mobile').insertAdjacentElement('afterbegin', options);
                            }

                        }
                    })
                }
            });
        })


        function checkHorizontal(target) {
            return target.classList.contains('control-cards__btn--horizontal');
        }

        function checkVertical(target) {
            return target.classList.contains('control-cards__btn--vertical');
        }
    })
}

export default controlCards;
