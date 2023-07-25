function controlCards() {
    const containers = document.querySelectorAll('.control-cards');
    if (!containers.length) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.control-cards__btn');
        const content = container.querySelector('.control-cards__content');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(el => el.classList.remove('_active'));

                content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical');
                if (checkHorizontal(btn)) {
                    content.classList.add('control-cards__content--horizontal');
                    container.querySelectorAll('.control-cards__btn--horizontal').forEach(el => el.classList.add('_active'));
                }
                if (checkVertical(btn)) {
                    content.classList.add('control-cards__content--vertical');
                    container.querySelectorAll('.control-cards__btn--vertical').forEach(el => el.classList.add('_active'));
                }


                if (content.querySelectorAll('.card-secondary').length >= 1) {
                    const cardsSecondary = content.querySelectorAll('.card-secondary');

                    cardsSecondary.forEach(card => {
                        const options = card.querySelector('.card-secondary__options');
                        const favorite = card.querySelector('.card-secondary__info--favorite');
                        const bottom = card.querySelector('.card-secondary__bottom');
                        if (options) {

                            if (checkHorizontal(btn)) {
                                card.querySelector('.card-secondary__bottom').insertAdjacentElement('beforebegin', options);
                            }
                            if (checkVertical(btn)) {
                                card.querySelector('.card-secondary__info--mobile').insertAdjacentElement('afterbegin', options);
                            }

                        }
                        if (favorite) {
                            if (checkVertical(btn)) {
                                bottom.classList.add('_vertical-active');
                                if (!card.querySelector('.card-secondary__bottom .card-secondary__info--favorite')) {
                                    const clone = favorite.cloneNode(true);
                                    bottom.appendChild(clone);
                                }
                                bottom.querySelector('.card-secondary__info--favorite').removeAttribute('hidden');
                            }
                            if (checkHorizontal(btn)) {
                                bottom.classList.remove('_vertical-active');
                                bottom.querySelector('.card-secondary__info--favorite').setAttribute('hidden', '');
                            }
                        }
                    })
                }

                if (content.querySelectorAll('.card-primary').length >= 1) {
                    const cardsPrimary = content.querySelectorAll('.card-primary');

                    cardsPrimary.forEach(card => {
                        const dislike = card.querySelector('.card-primary__info--dislike');
                        const comment = card.querySelector('.card-primary__info--comment');
                        const favorite = card.querySelector('.card-primary__info--favorite');
                        const bottom = card.querySelector('.card-primary__bottom');
                        if (dislike) {
                            if (checkVertical(btn)) {
                                bottom.classList.add('_vertical-active');
                                if (!card.querySelector('.card-primary__bottom .card-primary__info--dislike')) {
                                    const clone = dislike.cloneNode(true);
                                    bottom.appendChild(clone);
                                }
                                bottom.querySelector('.card-primary__info--dislike').removeAttribute('hidden');
                            }
                            if (checkHorizontal(btn)) {
                                bottom.classList.remove('_vertical-active');
                                bottom.querySelector('.card-primary__info--dislike').setAttribute('hidden', '');
                            }
                        }
                        if (comment) {
                            if (checkVertical(btn)) {
                                bottom.classList.add('_vertical-active');
                                if (!card.querySelector('.card-primary__bottom .card-primary__info--comment')) {
                                    const clone = comment.cloneNode(true);
                                    bottom.appendChild(clone);
                                }
                                bottom.querySelector('.card-primary__info--comment').removeAttribute('hidden');
                            }
                            if (checkHorizontal(btn)) {
                                bottom.classList.remove('_vertical-active');
                                bottom.querySelector('.card-primary__info--comment').setAttribute('hidden', '');
                            }
                        }

                        if (favorite) {
                            if (checkVertical(btn)) {
                                bottom.classList.add('_vertical-active');
                                if (!card.querySelector('.card-primary__bottom .card-primary__info--favorite')) {
                                    const clone = favorite.cloneNode(true);
                                    bottom.appendChild(clone);
                                }
                                bottom.querySelector('.card-primary__info--favorite').removeAttribute('hidden');
                            }
                            if (checkHorizontal(btn)) {
                                bottom.classList.remove('_vertical-active');
                                bottom.querySelector('.card-primary__info--favorite').setAttribute('hidden', '');
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
