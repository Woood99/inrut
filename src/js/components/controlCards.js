function controlCards() {
    const containers = document.querySelectorAll('.control-cards');
    if (!containers.length) return;
    containers.forEach(container => {
        const btns = container.querySelectorAll('.control-cards__btn');
        const content = container.querySelector('.control-cards__content');
        console.log(content);
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(el => el.classList.remove('_active'));
                btn.classList.add('_active');
                content.classList.remove('control-cards__content--horizontal', 'control-cards__content--vertical');
                if (btn.classList.contains('control-cards__btn--horizontal')) {
                    content.classList.add('control-cards__content--horizontal');
                }
                if (btn.classList.contains('control-cards__btn--vertical')) {
                    content.classList.add('control-cards__content--vertical');
                }
            });
        })
    })
}
controlCards();