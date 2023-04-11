const dropdownItems = (containerSelector, dropdownItemsSelector, btnSelector) => {
    const containers = document.querySelectorAll(containerSelector);
    if (!containers.length >= 1) return;
    containers.forEach(container => {
        const dropdownItems = container.querySelectorAll(dropdownItemsSelector);
        const btn = container.querySelector(btnSelector);
        btn.addEventListener('click', () => {
            dropdownItems.forEach(el => el.classList.remove('is-hidden'));
            btn.remove();
        });
    })
}

export default dropdownItems;
