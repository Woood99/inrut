const favoriteBtn = () => {
    const btns = document.querySelectorAll('.favorite-btn');
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (btn.hasAttribute('data-popup-path')) return;
            if (!btn.classList.contains('_active')) {
                btn.classList.add('_active');
                btn.setAttribute('title', 'Удалить с подбора');
            } else {
                btn.classList.remove('_active');
                btn.setAttribute('title', 'Добавить в подбор');
            }
        });
    })
};

export default favoriteBtn;
