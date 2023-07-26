const favoriteBtn = () => {
    const btns = document.querySelectorAll('.favorite-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const title = btn.querySelector('.secondary-tooltip__content');
            if (!btn.classList.contains('_active')) {
                btn.classList.add('_active');
                if (title) title.textContent = 'Удалить с подбора';
            } else {
                btn.classList.remove('_active');
                title.textContent = 'Добавить в подбор';
            }
        });
    })
};

export default favoriteBtn;
