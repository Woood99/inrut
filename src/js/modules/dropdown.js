const dropdown = (containerSelector, targetSelector) => {
    const container = document.querySelectorAll(containerSelector);
    container.forEach(el => {
        const target = el.querySelector(targetSelector);
        target.addEventListener('click', (e) => {
            e.preventDefault();
            container.forEach(el => {
                if (e.target.closest(containerSelector) !== el) el.classList.remove('_active');
            });
            el.classList.toggle('_active');
        });
        document.addEventListener('click', (e) => {
            if (el.classList.contains('_active') && !e.target.closest(containerSelector)) el.classList.remove('_active');
        })
    });
}

export default dropdown;
