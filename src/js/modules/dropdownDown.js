const dropdownDown = (containerSelector, textSelector, targetSelector) => {
    const items = document.querySelectorAll(containerSelector);
    if (!items.length >= 1) return;
    items.forEach(container => {
        const text = container.querySelector(textSelector);
        const btn = container.querySelector(targetSelector);
        btn.addEventListener('click', () => {
            text.classList.add('_active');
            btn.remove();
        })
    });
};

export default dropdownDown;
